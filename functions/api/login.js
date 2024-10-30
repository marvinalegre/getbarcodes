import jwt from "jsonwebtoken";

export async function onRequestPost(context) {
  const { request, env } = context;
  const { username, password } = await request.json();
  const { results: users } = await env.DB.prepare(
    "SELECT username, password FROM users WHERE username = ?"
  )
    .bind(username)
    .all();

  if (users.length !== 1) {
    return Response.json({
      success: false,
      err: "Invalid username or password",
    });
  }

  if (users[0].password !== password) {
    return Response.json({
      success: false,
      err: "Invalid username or password",
    });
  }

  const token = jwt.sign({ username: username }, env.JWT_SECRET, {
    algorithm: "HS256",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
