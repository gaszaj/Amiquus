import { readdir, readFile, rm } from 'fs/promises';
import path from 'path';
import Database from 'better-sqlite3';

// --- Configuration ---
const DATA_DIR = path.join(process.cwd(), 'src/data');
const DB_PATH = path.join(DATA_DIR, 'data.db');
const FILE_TO_EXCLUDE = 'site.webmanifest.json';

/**
 * Creates a SQLite database from JSON files in the src/data directory.
 * @param {import('astro').AstroLogger} logger - The Astro logger instance.
 */
export async function createDatabaseFromJson(logger) {
  logger.info('🚀 Starting database creation from JSON files...');

  try {
    // 1. Clean up the old database file to ensure a fresh start.
    logger.info(`Removing old database if it exists: ${DB_PATH}`);
    await rm(DB_PATH, { force: true });

    // 2. Initialize a new SQLite database.
    const db = new Database(DB_PATH);
    logger.info('Database initialized.');

    // 3. Get all JSON files from the data directory, excluding the manifest.
    const allFiles = await readdir(DATA_DIR);
    const jsonFiles = allFiles.filter(
      file => file.endsWith('.json') && file !== FILE_TO_EXCLUDE
    );

    // 4. Process each JSON file and create a table for it.
    for (const fileName of jsonFiles) {
      const sourcePath = path.join(DATA_DIR, fileName);
      const tableName = path.basename(fileName, '.json');

      const fileContent = await readFile(sourcePath, 'utf-8');
      const data = JSON.parse(fileContent);

      // Skip if the JSON file is empty or not an array of objects.
      if (!Array.isArray(data) || data.length === 0) {
        logger.warn(`Skipping ${fileName}: No data to process.`);
        continue;
      }
      
      // Dynamically determine columns from the first object's keys.
      const columns = Object.keys(data[0]);
      if (columns.length === 0) {
          logger.warn(`Skipping ${tableName}: First object has no keys.`);
          continue;
      }

      // Create the table schema. Using TEXT is safest for dynamic data.
      // Backticks ` ` are used to safely handle column/table names that might be SQL keywords.
      const createTableStmt = `
        CREATE TABLE IF NOT EXISTS \`${tableName}\` (
          ${columns.map(col => `\`${col}\` TEXT`).join(',\n          ')}
        );
      `;
      db.exec(createTableStmt);

      // Prepare an efficient INSERT statement.
      const insert = db.prepare(
        `INSERT INTO \`${tableName}\` (${columns.map(c => `\`${c}\``).join(', ')}) 
         VALUES (${columns.map(() => '?').join(', ')})`
      );

      // Use a transaction for bulk inserts, which is significantly faster.
      const insertMany = db.transaction((rows) => {
        for (const row of rows) {
          // Ensure values are in the same order as columns.
          const values = columns.map(col => {
            const value = row[col];
            // SQLite can handle numbers, but stringifying objects/arrays is safer.
            if (typeof value === 'object' && value !== null) {
              return JSON.stringify(value);
            }
            return value;
          });
          insert.run(...values);
        }
      });
      
      insertMany(data);

      logger.info(`✅ Created table \`${tableName}\` and inserted ${data.length} rows.`);
    }
    
    // 5. Close the database connection.
    db.close();
    logger.info('✨ Database creation complete! `data.db` is ready in src/data/.');

  } catch (error) {
    logger.error('❌ Error during database creation:', error);
    process.exit(1); // Exit with an error code
  }
}