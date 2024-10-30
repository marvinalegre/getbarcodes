import jwt from "jsonwebtoken";

export async function onRequestPost(context) {
  const { request } = context;

  const { username, password } = await request.json();

  if (username === "marvin" && password === "foobar") {
    const token = jwt.sign({ username: username }, context.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  } else {
    return Response.json({
      success: false,
      err: "Invalid username or password",
    });
  }
}
