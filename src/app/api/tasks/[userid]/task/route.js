import pool from "@/lib/pgConnection";

export async function PUT(req) {
  const { id, title, description, status } = await req.json();

  try {
    const updateQuery = `
      UPDATE tasks
      SET title = $1, description = $2, status = COALESCE($3, status)
      WHERE id = $4
      RETURNING *
    `;
    const values = [title, description, status, id];

    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      return new Response("Task not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PUT task error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const result = await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return new Response("Task not found", { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("DELETE task error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
