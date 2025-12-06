import { Pool } from "pg";
import { config } from ".";

export const pool = new Pool({ connectionString: config.connection_string });

export const initDB = async () => {
  // create users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email TEXT UNIQUE NOT NULL CHECK(email = LOWER(email)),
    password TEXT NOT NULL CHECK(LENGTH(password) >= 6),
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN('admin', 'customer'))
    )
    `);
};
