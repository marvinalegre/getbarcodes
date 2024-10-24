import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/root`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const { loggedIn, username } = await res.json();

  return { loggedIn, username };
}

export default function Root() {
  const { loggedIn, username } = useLoaderData();

  return (
    <>
      <Link to="/">
        <h1>getbarcodes</h1>
      </Link>

      {loggedIn ? null : <Link to="login">Login</Link>}
      {loggedIn ? <Link to="logout">Logout</Link> : null}

      {loggedIn ? <p>You are logged in as: {username}</p> : null}

      <hr />

      <Outlet />

      <hr />

      <a href="https://downloadbarcodes.pages.dev">
        downloadbarcodes.pages.dev
      </a>
    </>
  );
}
