import pool from "@/lib/pgConnection";

export async function POST(req) {
  try {
    const { title, description, status, userId } = await req.json();

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, "userId") 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [title, description, status, userId]
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
    console.error("POST /tasks error:", err);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
    });
  }
}
