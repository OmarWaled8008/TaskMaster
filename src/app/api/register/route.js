import pool from "@/lib/pgConnection";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (rows.length > 0) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, password]
    );

    return new Response(
      JSON.stringify({ message: "Registration successful" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("User creation error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
