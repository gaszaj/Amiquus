// src/scripts/seed-db.mjs
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

// Absolute path to src/data based on where you run `npm run seed:db`
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const DB_PATH = path.join(DATA_DIR, "amiquus-users-subs.db"); // you can rename later

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function seedUsers(db) {
  console.log("Reading users.json...");
  const raw = fs.readFileSync(path.join(DATA_DIR, "users.json"), "utf8");
  const users = JSON.parse(raw);

  console.log(`Seeding users (${users.length} rows)...`);

  db.exec(`DROP TABLE IF EXISTS users;`);
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT,
      google_id TEXT,
      first_name TEXT,
      last_name TEXT,
      stripe_customer_id TEXT,
      created_at TEXT NOT NULL,
      is_email_verified INTEGER NOT NULL DEFAULT 0,
      reset_token TEXT,
      reset_token_expiry TEXT,
      verification_code TEXT,
      verification_code_expiry TEXT
    );
  `);

  const stmt = db.prepare(`
    INSERT INTO users (
      id, username, email, password, google_id,
      first_name, last_name, stripe_customer_id,
      created_at, is_email_verified,
      reset_token, reset_token_expiry,
      verification_code, verification_code_expiry
    ) VALUES (
      @id, @username, @email, @password, @google_id,
      @first_name, @last_name, @stripe_customer_id,
      @created_at, @is_email_verified,
      @reset_token, @reset_token_expiry,
      @verification_code, @verification_code_expiry
    );
  `);

  const insertMany = db.transaction((rows) => {
    for (const u of rows) {
      stmt.run({
        ...u,
        is_email_verified: u.is_email_verified ? 1 : 0
      });
    }
  });

  insertMany(users);
  console.log("Users seeded.");
}

function seedSubscriptions(db) {
  console.log("Reading subscriptions.json...");
  const raw = fs.readFileSync(path.join(DATA_DIR, "subscriptions.json"), "utf8");
  const subs = JSON.parse(raw);

  console.log(`Seeding subscriptions (${subs.length} rows)...`);

  db.exec(`DROP TABLE IF EXISTS subscriptions;`);
  db.exec(`
    CREATE TABLE subscriptions (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      stripe_subscription_id TEXT,
      websites_selected TEXT NOT NULL, -- JSON string
      facebook_marketplace_url TEXT,
      update_frequency TEXT,
      brand TEXT,
      model TEXT,
      fuel_type TEXT,
      year_min INTEGER,
      year_max INTEGER,
      mileage_min INTEGER,
      mileage_max INTEGER,
      price_min INTEGER,
      price_max INTEGER,
      notification_language TEXT,
      price INTEGER,
      status TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      stripe_price_id TEXT,
      telegram_username TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  const stmt = db.prepare(`
    INSERT INTO subscriptions (
      id, user_id, stripe_subscription_id,
      websites_selected, facebook_marketplace_url,
      update_frequency, brand, model, fuel_type,
      year_min, year_max, mileage_min, mileage_max,
      price_min, price_max, notification_language,
      price, status, created_at, updated_at,
      stripe_price_id, telegram_username
    ) VALUES (
      @id, @user_id, @stripe_subscription_id,
      @websites_selected, @facebook_marketplace_url,
      @update_frequency, @brand, @model, @fuel_type,
      @year_min, @year_max, @mileage_min, @mileage_max,
      @price_min, @price_max, @notification_language,
      @price, @status, @created_at, @updated_at,
      @stripe_price_id, @telegram_username
    );
  `);

  const insertMany = db.transaction((rows) => {
    for (const s of rows) {
      stmt.run({
        ...s,
        websites_selected: JSON.stringify(s.websites_selected ?? null)
      });
    }
  });

  insertMany(subs);
  console.log("Subscriptions seeded.");
}

function seedSessions(db) {
  console.log("Reading session.json...");
  const raw = fs.readFileSync(path.join(DATA_DIR, "session.json"), "utf8");
  const sessRows = JSON.parse(raw);

  console.log(`Seeding sessions (${sessRows.length} rows)...`);

  db.exec(`DROP TABLE IF EXISTS sessions;`);
  db.exec(`
    CREATE TABLE sessions (
      sid TEXT PRIMARY KEY,
      sess TEXT NOT NULL,   -- JSON string
      expire TEXT NOT NULL   -- ISO time string
    );
  `);

  const stmt = db.prepare(`
    INSERT INTO sessions (sid, sess, expire)
    VALUES (@sid, @sess, @expire);
  `);

  const insertMany = db.transaction((rows) => {
    for (const s of rows) {
      stmt.run({
        sid: s.sid,
        sess: JSON.stringify(s.sess),
        expire: s.expire
      });
    }
  });

  insertMany(sessRows);
  console.log("Sessions seeded.");
}

function seedDatabase() {
  console.log("Ensuring data directory:", DATA_DIR);
  ensureDataDir();

  if (fs.existsSync(DB_PATH)) {
    console.log("Removing existing DB at", DB_PATH);
    fs.unlinkSync(DB_PATH);
  }

  console.log("Opening DB at", DB_PATH);
  const db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON;");

  seedUsers(db);
  seedSubscriptions(db);
  seedSessions(db);

  db.close();
  console.log(`\nDone. SQLite database created at ${DB_PATH}`);
}

// Always run when this file is executed via `node src/scripts/seed-db.mjs`
seedDatabase();
