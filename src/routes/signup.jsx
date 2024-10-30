import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const res = await fetch("/api/signup", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });
  const { success, err } = await res.json();

  if (success) {
    return redirect("/");
  }

  return { err };
}

export async function loader() {
  const res = await fetch("/api/user");
  const { loggedIn } = await res.json();

  if (loggedIn) return redirect("/");

  return null;
}

export default function SignUp() {
  const actionData = useActionData();

  return (
    <>
      <p>{actionData ? actionData.err : ""}</p>
      <Form method="post">
        <label htmlFor="username">username:</label>
        <input id="username" name="username" />
        <br />
        <label htmlFor="password">password:</label>
        <input id="password" name="password" type="password" />
        <br />
        <button type="submit">sign up</button>
      </Form>
    </>
  );
}
