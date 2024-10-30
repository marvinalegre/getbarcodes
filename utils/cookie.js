export function getCookies(req) {
  // Get the cookie header from the request
  const cookieHeader = req.headers.get("Cookie");

  // Initialize an object to hold the cookies
  const cookies = {};

  // Parse the cookie string if it exists
  if (cookieHeader) {
    cookieHeader.split("; ").forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookies[name] = decodeURIComponent(value);
    });
  }

  return cookies;
}
