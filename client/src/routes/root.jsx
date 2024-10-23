import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>getbarcodes</h1>
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>

      <hr />

      <Outlet />
    </>
  );
}
