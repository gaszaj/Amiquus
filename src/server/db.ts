import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "src", "data", "amiquus-users-subs.db");

export const db = new Database(dbPath);
