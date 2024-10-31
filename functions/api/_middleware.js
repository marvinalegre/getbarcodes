import jwt from "jsonwebtoken";
import { getCookies } from "../../utils/cookie";

// auth
export async function onRequest(context) {
  const { request } = context;
  const { token } = getCookies(request);

  try {
    const decodedPayload = jwt.verify(token, context.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    context.data.username = decodedPayload.username;
  } catch (err) {
    console.log(err.message);
  }

  return context.next();
}
