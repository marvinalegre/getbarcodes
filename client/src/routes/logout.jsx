import { redirect } from "react-router-dom";

export async function loader() {
  localStorage.setItem("token", null);
  return redirect("/");
}

export default function Logout() {
  return <p>Logging out...</p>;
}
