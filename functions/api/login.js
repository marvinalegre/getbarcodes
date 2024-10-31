import jwt from "jsonwebtoken";
import reservedUsernames from "../../utils/reserved-usernames.json";
import { validUsername } from "../../utils/validation";
import { compare } from "../../utils/bcrypt";

export async function onRequestPost(context) {
  const { request, env } = context;
  const { username, password } = await request.json();

  if (!validUsername(username) || reservedUsernames.includes(username)) {
    return Response.json({
      success: false,
      err: "Invalid username",
    });
  }

  if (password.length < 12) {
    return Response.json({
      success: false,
      err: "Password must be at least 12 characters",
    });
  }

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

  if (!(await compare(password, users[0].password))) {
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
