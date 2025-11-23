import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import pkg from "pg";

const { Client } = pkg;

// Resolve project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// Read env DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in your .env");
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL });

const users = JSON.parse(fs.readFileSync(path.join(root, "users.json"), "utf8"));
const subs = JSON.parse(fs.readFileSync(path.join(root, "subscriptions.json"), "utf8"));
const sessions = JSON.parse(fs.readFileSync(path.join(root, "session.json"), "utf8"));

const toDate = (v) => (v ? new Date(v) : null);

async function main() {
  await client.connect();
  console.log(`Connected. users=${users.length}, subs=${subs.length}, sessions=${sessions.length}`);

  await client.query("BEGIN");

  // ---------------- USERS ----------------
  for (const u of users) {
    await client.query(
      `
      INSERT INTO "User" (
        "id",
        "legacyId","username","email","hashedPassword","googleId",
        "firstName","lastName","stripeCustomerId",
        "isEmailVerified","resetToken","resetTokenExpiry",
        "verificationCode","verificationCodeExpiry",
        "preferredLanguage","createdAt","updatedAt"
      ) VALUES (
        $1::text,
        $2::int, $3::text, $4::text, $5::text, $6::text,
        $7::text, $8::text, $9::text,
        $10::boolean, $11::text, $12::timestamptz,
        $13::text, $14::timestamptz,
        $15::text, $16::timestamptz, $17::timestamptz
      )
      ON CONFLICT ("legacyId") DO UPDATE SET
        "username"=EXCLUDED."username",
        "email"=EXCLUDED."email",
        "hashedPassword"=EXCLUDED."hashedPassword",
        "googleId"=EXCLUDED."googleId",
        "firstName"=EXCLUDED."firstName",
        "lastName"=EXCLUDED."lastName",
        "stripeCustomerId"=EXCLUDED."stripeCustomerId",
        "isEmailVerified"=EXCLUDED."isEmailVerified",
        "resetToken"=EXCLUDED."resetToken",
        "resetTokenExpiry"=EXCLUDED."resetTokenExpiry",
        "verificationCode"=EXCLUDED."verificationCode",
        "verificationCodeExpiry"=EXCLUDED."verificationCodeExpiry",
        "preferredLanguage"=COALESCE(EXCLUDED."preferredLanguage","User"."preferredLanguage"),
        "createdAt"=COALESCE(EXCLUDED."createdAt","User"."createdAt"),
        "updatedAt"=EXCLUDED."updatedAt"
      ;
      `,
      [
        crypto.randomUUID(),                 // $1 id (text)
        u.id ?? null,                        // $2 legacyId (int)
        u.username ?? null,                  // $3
        u.email,                             // $4
        u.password ?? null,                  // $5
        u.google_id ?? null,                 // $6
        u.first_name ?? null,                // $7
        u.last_name ?? null,                 // $8
        u.stripe_customer_id ?? null,        // $9
        !!u.is_email_verified,               // $10
        u.reset_token ?? null,               // $11
        toDate(u.reset_token_expiry),        // $12
        u.verification_code ?? null,         // $13
        toDate(u.verification_code_expiry),  // $14
        u.preferred_language ?? null,        // $15
        toDate(u.created_at) ?? new Date(),  // $16 createdAt
        toDate(u.updated_at) ?? new Date(),  // $17 updatedAt
      ]
    );
  }

  // Map legacyId -> cuid id
  const { rows: userRows } = await client.query(
    `SELECT id, "legacyId" FROM "User" WHERE "legacyId" IS NOT NULL;`
  );
  const legacyToCuid = new Map(userRows.map((r) => [r.legacyId, r.id]));

  // ------------- CAR SUBSCRIPTIONS -------------
  for (const s of subs) {
    const userId = s.user_id ? legacyToCuid.get(s.user_id) : null;

    await client.query(
      `
      INSERT INTO "CarSubscription" (
        "id",
        "legacyId","userId",
        "stripeSubscriptionId","stripePriceId",
        "websitesSelected","facebookMarketplaceUrl","updateFrequency",
        "brand","modelName","fuelType",
        "yearMin","yearMax","mileageMin","mileageMax","priceMin","priceMax",
        "notificationLanguage","telegramUsername",
        "price","status","createdAt","updatedAt"
      ) VALUES (
        $1::text,
        $2::int, $3::text,
        $4::text, $5::text,
        $6::text[], $7::text, $8::text,
        $9::text, $10::text, $11::text,
        $12::int, $13::int, $14::int, $15::int, $16::int, $17::int,
        $18::text, $19::text,
        $20::int, $21::text, $22::timestamptz, $23::timestamptz
      )
      ON CONFLICT ("legacyId") DO UPDATE SET
        "userId"=EXCLUDED."userId",
        "stripeSubscriptionId"=EXCLUDED."stripeSubscriptionId",
        "stripePriceId"=EXCLUDED."stripePriceId",
        "websitesSelected"=EXCLUDED."websitesSelected",
        "facebookMarketplaceUrl"=EXCLUDED."facebookMarketplaceUrl",
        "updateFrequency"=EXCLUDED."updateFrequency",
        "brand"=EXCLUDED."brand",
        "modelName"=EXCLUDED."modelName",
        "fuelType"=EXCLUDED."fuelType",
        "yearMin"=EXCLUDED."yearMin",
        "yearMax"=EXCLUDED."yearMax",
        "mileageMin"=EXCLUDED."mileageMin",
        "mileageMax"=EXCLUDED."mileageMax",
        "priceMin"=EXCLUDED."priceMin",
        "priceMax"=EXCLUDED."priceMax",
        "notificationLanguage"=EXCLUDED."notificationLanguage",
        "telegramUsername"=EXCLUDED."telegramUsername",
        "price"=EXCLUDED."price",
        "status"=EXCLUDED."status",
        "createdAt"=EXCLUDED."createdAt",
        "updatedAt"=EXCLUDED."updatedAt"
      ;
      `,
      [
        crypto.randomUUID(),                 // $1 id
        s.id ?? null,                        // $2 legacyId
        userId,                              // $3 userId (text cuid)
        s.stripe_subscription_id ?? null,    // $4
        s.stripe_price_id ?? null,           // $5
        s.websites_selected ?? [],           // $6 text[]
        s.facebook_marketplace_url ?? null,  // $7
        s.update_frequency ?? null,          // $8
        s.brand ?? null,                     // $9
        s.model ?? null,                     // $10
        s.fuel_type ?? null,                 // $11
        s.year_min ?? null,                  // $12
        s.year_max ?? null,                  // $13
        s.mileage_min ?? null,               // $14
        s.mileage_max ?? null,               // $15
        s.price_min ?? null,                 // $16
        s.price_max ?? null,                 // $17
        s.notification_language ?? null,     // $18
        s.telegram_username ?? null,         // $19
        s.price ?? null,                     // $20
        s.status ?? null,                    // $21
        toDate(s.created_at),                // $22
        toDate(s.updated_at),                // $23
      ]
    );
  }

  // ---------------- SESSIONS ----------------
  for (const sess of sessions) {
    const legacyUserId = sess?.sess?.passport?.user;
    const userId = legacyUserId ? legacyToCuid.get(legacyUserId) : null;
    const expire = toDate(sess.expire);
    const expiresAt = expire ?? new Date(Date.now() + 7 * 24 * 3600 * 1000);

    await client.query(
      `
      INSERT INTO "Session" (
        "id",
        "sid","userId","data","expire","expiresAt"
      ) VALUES (
        $1::text,
        $2::text, $3::text, $4::jsonb, $5::timestamptz, $6::timestamptz
      )
      ON CONFLICT ("sid") DO UPDATE SET
        "userId"=EXCLUDED."userId",
        "data"=EXCLUDED."data",
        "expire"=EXCLUDED."expire",
        "expiresAt"=EXCLUDED."expiresAt"
      ;
      `,
      [
        crypto.randomUUID(),   // $1 id
        sess.sid,              // $2 sid
        userId,                // $3 userId cuid
        sess.sess ?? null,     // $4 jsonb
        expire,                // $5
        expiresAt,             // $6
      ]
    );
  }

  await client.query("COMMIT");
  console.log("✅ Import finished.");
  await client.end();
}

main().catch(async (e) => {
  console.error("❌ Import failed:", e);
  try { await client.query("ROLLBACK"); } catch {}
  await client.end();
  process.exit(1);
});
