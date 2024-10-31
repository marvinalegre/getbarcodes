export async function onRequestPost(context) {
  if (!context.data.username) {
    return Response.json({
      success: false,
      err: "Go and login first",
    });
  }

  const { request, env } = context;
  const { barcode, productName } = await request.json();
  const { results: barcodes } = await env.DB.prepare(
    "SELECT barcode FROM barcodes WHERE barcode = ?"
  )
    .bind(barcode)
    .all();

  if (barcodes.length !== 0) {
    return Response.json({
      success: false,
      err: "Barcode already exists",
    });
  }

  const { results: users } = await env.DB.prepare(
    "SELECT id FROM users WHERE username = ?"
  )
    .bind(context.data.username)
    .all();

  if (users.length !== 1) {
    return Response.json({
      success: false,
      err: "Go and login first",
    });
  }

  try {
    await env.DB.prepare(
      "INSERT INTO barcodes (barcode, product_name, user_id) VALUES (?, ?, ?)"
    )
      .bind(barcode, productName, users[0].id)
      .all();
  } catch (err) {
    console.log(err);
    return Response.json({
      success: false,
      err: "Something went wrong. Please try again later",
    });
  }

  return Response.json({
    success: true,
  });
}
