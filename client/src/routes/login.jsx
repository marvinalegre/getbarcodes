import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const res = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
    method: "post",
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });
  const json = await res.json();

  if (json.success) {
    localStorage.setItem("token", json.token);
    return redirect("/");
  }

  return {
    message: json.message,
  };
}

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/root`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const { loggedIn } = await res.json();

  if (loggedIn) return redirect("/");
  return { loggedIn };
}

export default function Login() {
  const actionData = useActionData();
  return (
    <>
      <p>{actionData ? actionData.message : ""}</p>
      <Form method="post">
        <label htmlFor="username">username:</label>
        <input id="username" name="username" />
        <br />
        <label htmlFor="password">password:</label>
        <input id="password" name="password" type="password" />
        <br />
        <button type="submit">login</button>
      </Form>
    </>
  );
}
