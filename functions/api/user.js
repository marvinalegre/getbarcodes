export async function onRequest(context) {
  if (context.data.username) {
    return Response.json({ loggedIn: true, username: context.data.username });
  }
  return Response.json({ loggedIn: false });
}
