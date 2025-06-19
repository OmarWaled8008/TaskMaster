import pool from "@/lib/pgConnection";

export async function GET(req) {
  try {
    const { rows } = await pool.query("SELECT id, name, email FROM users");

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /users error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
