import { Link, Outlet, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const res = await fetch("/api/user");
  const { loggedIn, username } = await res.json();

  return { loggedIn, username };
};

export default function Root() {
  const { loggedIn, username } = useLoaderData();

  return (
    <>
      <Link to="/">
        <h1>getbarcodes</h1>
      </Link>

      {loggedIn ? null : <Link to="login">Login</Link>}
      {loggedIn ? null : <Link to="signup">Sign Up</Link>}
      {loggedIn ? <Link to="logout">Logout</Link> : null}

      {loggedIn ? <p>You are logged in as: {username}</p> : null}

      <hr />

      <Outlet />

      <hr />

      <p>
        bulk data download:{" "}
        <a href="/database.sql" download style={{ display: "inline" }}>
          database.sql
        </a>
      </p>
    </>
  );
}
