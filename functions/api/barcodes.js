export async function onRequest(context) {
  // TODO: rate limit, paginate
  const { env } = context;

  const { results } = await env.DB.prepare(
    "select barcode, product_name, username from barcodes left join users on users.id=barcodes.user_id"
  ).all();

  return Response.json(results);
}
