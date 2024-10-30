import jwt from "jsonwebtoken";

export async function onRequest(context) {
  console.log(context.env.JWT_SECRET); /////////////

  const token = jwt.sign({ username: "mario" }, "secret", {
    algorithm: "HS256",
  });

  const response = new Response("Cookie set!", {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });

  return response;
}
