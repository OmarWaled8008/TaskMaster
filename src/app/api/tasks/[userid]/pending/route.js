import pool from "@/lib/pgConnection";

export async function GET(request, { params }) {
  const { userid } = params;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM tasks WHERE userid = $1 AND status = 'pending'`,
      [userid]
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET pending tasks error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}

export async function PATCH(request, { params }) {
  const { userid } = params;
  const { id } = await request.json();

  try {
    const result = await pool.query(
      `UPDATE tasks SET status = 'pending' WHERE id = $1 AND userid = $2 RETURNING *`,
      [id, userid]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Task marked as pending" }), {
      status: 200,
    });
  } catch (err) {
    console.error("PATCH pending task error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
