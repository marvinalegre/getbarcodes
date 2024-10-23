import { Hono } from "hono";
import { cors } from "hono/cors";
import { sign, verify } from "hono/jwt";

const app = new Hono();

app.use("*", async function (c, next) {
  const corsMiddleware = cors({
    origin: [c.env.FRONTEND],
  });

  await corsMiddleware(c, next);
});

app.post("/auth", async (c) => {
  const { token } = await c.req.json();

  let decodedPayload;
  try {
    decodedPayload = await verify(token, c.env.JWT_SECRET);
  } catch (e) {
    return c.json({
      loggedIn: false,
    });
  }

  return c.json({
    loggedIn: true,
    username: decodedPayload.username,
  });
});

app.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM users WHERE username = ?"
  )
    .bind(username)
    .all();

  if (results.length === 0) {
    return c.json({
      success: false,
      message: "Invalid username or password",
    });
  } else if (results.length === 1) {
    if (password === results[0].password) {
      return c.json({
        success: true,
        token: await sign({ username: username }, c.env.JWT_SECRET),
      });
    } else {
      return c.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  }
});

export default app;
