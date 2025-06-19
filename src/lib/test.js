import "dotenv/config";
import pool from "./pgConnection.js"; // ✅ Correct file name now


(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected at:", res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection error:", err);
    process.exit(1);
  }
})();
