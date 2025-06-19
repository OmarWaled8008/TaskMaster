import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
