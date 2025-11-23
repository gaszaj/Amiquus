// prisma/import-json.ts
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient(); // ✅ no constructor options

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

async function main() {
  const root = process.cwd();

  const users = loadJson<any[]>(path.join(root, "users.json"));
  const subs = loadJson<any[]>(path.join(root, "subscriptions.json"));
  const sessions = loadJson<any[]>(path.join(root, "session.json"));

  console.log(`Found users=${users.length}, subs=${subs.length}, sessions=${sessions.length}`);

  // ---------------- USERS ----------------
  for (const u of users) {
    await prisma.user.upsert({
      where: { legacyId: u.id },
      update: {
        username: u.username ?? null,
        email: u.email,
        hashedPassword: u.password ?? null,
        googleId: u.google_id ?? null,
        firstName: u.first_name ?? null,
        lastName: u.last_name ?? null,
        stripeCustomerId: u.stripe_customer_id ?? null,
        isEmailVerified: !!u.is_email_verified,
        resetToken: u.reset_token ?? null,
        resetTokenExpiry: u.reset_token_expiry ? new Date(u.reset_token_expiry) : null,
        verificationCode: u.verification_code ?? null,
        verificationCodeExpiry: u.verification_code_expiry ? new Date(u.verification_code_expiry) : null,
        createdAt: u.created_at ? new Date(u.created_at) : undefined,
      },
      create: {
        legacyId: u.id,
        username: u.username ?? null,
        email: u.email,
        hashedPassword: u.password ?? null,
        googleId: u.google_id ?? null,
        firstName: u.first_name ?? null,
        lastName: u.last_name ?? null,
        stripeCustomerId: u.stripe_customer_id ?? null,
        isEmailVerified: !!u.is_email_verified,
        resetToken: u.reset_token ?? null,
        resetTokenExpiry: u.reset_token_expiry ? new Date(u.reset_token_expiry) : null,
        verificationCode: u.verification_code ?? null,
        verificationCodeExpiry: u.verification_code_expiry ? new Date(u.verification_code_expiry) : null,
        preferredLanguage: u.preferred_language ?? null,
        createdAt: u.created_at ? new Date(u.created_at) : undefined,
      },
    });
  }

  // Map legacy numeric id -> new cuid id
  const usersInDb = await prisma.user.findMany({
    where: { legacyId: { not: null } },
    select: { id: true, legacyId: true },
  });

  const legacyToCuid = new Map<number, string>();
  for (const row of usersInDb) legacyToCuid.set(row.legacyId!, row.id);

  // ------------- CAR SUBSCRIPTIONS -------------
  for (const s of subs) {
    const cuid = s.user_id ? legacyToCuid.get(s.user_id) : null;

    await prisma.carSubscription.upsert({
      where: { legacyId: s.id },
      update: {
        userId: cuid ?? null,
        stripeSubscriptionId: s.stripe_subscription_id ?? null,
        stripePriceId: s.stripe_price_id ?? null,

        websitesSelected: s.websites_selected ?? [],
        facebookMarketplaceUrl: s.facebook_marketplace_url ?? null,
        updateFrequency: s.update_frequency ?? null,

        brand: s.brand ?? null,
        modelName: s.model ?? null,
        fuelType: s.fuel_type ?? null,
        yearMin: s.year_min ?? null,
        yearMax: s.year_max ?? null,
        mileageMin: s.mileage_min ?? null,
        mileageMax: s.mileage_max ?? null,
        priceMin: s.price_min ?? null,
        priceMax: s.price_max ?? null,

        notificationLanguage: s.notification_language ?? null,
        telegramUsername: s.telegram_username ?? null,

        price: s.price ?? null,
        status: s.status ?? null,

        createdAt: s.created_at ? new Date(s.created_at) : null,
        updatedAt: s.updated_at ? new Date(s.updated_at) : null,
      },
      create: {
        legacyId: s.id,
        userId: cuid ?? null,
        stripeSubscriptionId: s.stripe_subscription_id ?? null,
        stripePriceId: s.stripe_price_id ?? null,

        websitesSelected: s.websites_selected ?? [],
        facebookMarketplaceUrl: s.facebook_marketplace_url ?? null,
        updateFrequency: s.update_frequency ?? null,

        brand: s.brand ?? null,
        modelName: s.model ?? null,
        fuelType: s.fuel_type ?? null,
        yearMin: s.year_min ?? null,
        yearMax: s.year_max ?? null,
        mileageMin: s.mileage_min ?? null,
        mileageMax: s.mileage_max ?? null,
        priceMin: s.price_min ?? null,
        priceMax: s.price_max ?? null,

        notificationLanguage: s.notification_language ?? null,
        telegramUsername: s.telegram_username ?? null,

        price: s.price ?? null,
        status: s.status ?? null,

        createdAt: s.created_at ? new Date(s.created_at) : null,
        updatedAt: s.updated_at ? new Date(s.updated_at) : null,
      },
    });
  }

  // ---------------- SESSIONS ----------------
  for (const sess of sessions) {
    const legacyUserId = sess?.sess?.passport?.user;
    const cuid = legacyUserId ? legacyToCuid.get(legacyUserId) : null;

    await prisma.session.upsert({
      where: { sid: sess.sid },
      update: {
        userId: cuid ?? null,
        data: sess.sess ?? null,
        expire: sess.expire ? new Date(sess.expire) : null,
        expiresAt: sess.expire
          ? new Date(sess.expire)
          : new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
      create: {
        sid: sess.sid,
        userId: cuid ?? null,
        data: sess.sess ?? null,
        expire: sess.expire ? new Date(sess.expire) : null,
        expiresAt: sess.expire
          ? new Date(sess.expire)
          : new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
  }

  console.log("✅ One-time import finished.");
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
