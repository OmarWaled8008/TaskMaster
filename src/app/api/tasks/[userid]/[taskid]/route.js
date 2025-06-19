import pool from "@/lib/pgConnection";

export async function GET(request, { params }) {
  const { userid, taskid } = params;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM tasks WHERE userid = $1 AND id = $2`,
      [userid, taskid]
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET task error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
