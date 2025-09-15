import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://user:pass@localhost:5432/db
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
