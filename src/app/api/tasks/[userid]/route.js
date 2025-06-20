import pool from "@/lib/pgConnection";

export async function GET(request, { params }) {
  const { userid } = params;
  console.log(`GET /tasks/${userid} called`);
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE userid = $1", [
      userid,
    ]);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /tasks/[userid] error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}
