import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

const app = new Hono();

app.options("*", (c) => {
  c.header("Access-Control-Allow-Origin", c.env.FRONTEND);
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  return c.text("No content");
});

// cors
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", c.env.FRONTEND);

  return await next();
});

app.use("/auth/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");

  c.set("loggedIn", true);
  if (!authHeader) {
    c.set("loggedIn", false);
    return await next();
  } else {
    const token = authHeader.split(" ")[1];

    let decodedPayload;
    try {
      decodedPayload = await verify(token, c.env.JWT_SECRET);
    } catch (e) {
      c.set("loggedIn", false);
      return await next();
    }

    c.set("username", decodedPayload.username);
    return await next();
  }
});

app.get("/auth/root", async (c) => {
  if (c.get("loggedIn")) {
    return c.json({
      loggedIn: true,
      username: c.get("username"),
    });
  } else {
    return c.json({
      loggedIn: false,
    });
  }
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
  } else {
    // TODO: respond with an internal error
  }
});

app.get("/auth/barcodes", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT barcodes.id, barcode, product_name, username FROM barcodes join users on barcodes.user_id = users.id"
  ).all();
  return c.json({
    barcodes: results,
    loggedIn: c.get("loggedIn"),
    username: c.get("username"),
  });
});

// TODO: put this endpoint behind an auth check
app.post("/auth/add", async (c) => {
  // TODO: validate these inputs
  const { barcode, productName } = await c.req.json();

  const { results: users } = await c.env.DB.prepare(
    "SELECT * FROM users WHERE username = ?"
  )
    .bind(c.get("username"))
    .all();
  const { id } = users[0];

  await c.env.DB.prepare(
    "INSERT INTO barcodes (barcode, product_name, user_id) VALUES (?, ?, ?)"
  )
    .bind(barcode, productName, id)
    .all();

  // TODO: do some exception handling

  return c.text("success");
});

app.get("/auth/barcode/:barcode", async (c) => {
  const barcode = c.req.param("barcode");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM barcodes WHERE barcode = ?"
  )
    .bind(barcode)
    .all();

  // TODO: validate input, respond accordingly
  if (results.length === 0) {
    return c.json({
      err: "No entry on the database",
    });
  } else if (results.length === 1) {
    return c.json({
      productName: results[0].product_name,
      loggedIn: c.get("loggedIn"),
    });
  } else {
    // TODO: err
  }
});

export default app;
