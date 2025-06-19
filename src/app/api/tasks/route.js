import pool from "@/lib/pgConnection";

export async function POST(req) {
  try {
    const { title, description, status, userid } = await req.json();

    if (!title || !description || !status || !userid) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, "userid")
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, status, userid]
    );

    return new Response(
      JSON.stringify({
        message: "Task created successfully!",
        task: result.rows[0],
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("POST /tasks error:", err.stack);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}
