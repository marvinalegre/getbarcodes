import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  });
  const { loggedIn, username } = await res.json();

  return { loggedIn, username };
}

export default function Root() {
  const { loggedIn, username } = useLoaderData();

  return (
    <>
      <h1>getbarcodes</h1>

      <Link to="/">Home</Link>
      {loggedIn ? null : <Link to="login">Login</Link>}
      {loggedIn ? <Link to="logout">Logout</Link> : null}

      {loggedIn ? <p>You are logged in as: {username}</p> : null}

      <hr />

      <Outlet />
    </>
  );
}
