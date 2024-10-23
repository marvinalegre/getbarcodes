import { Form, Link } from "react-router-dom";

export default function Login() {
  return (
    <Form method="post">
      <label htmlFor="username">username:</label>
      <input id="username" name="username" />
      <br />
      <label htmlFor="password">password:</label>
      <input id="password" name="password" />
      <br />
      <button type="submit">login</button>
    </Form>
  );
}
