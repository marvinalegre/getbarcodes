import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  await fetch(`${import.meta.env.VITE_BACKEND}/auth/add`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      barcode: formData.get("barcode"),
      productName: formData.get("productName"),
    }),
  });

  return redirect("/");
}

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  });
  const { loggedIn } = await res.json();

  if (loggedIn) return redirect("/");
  return { loggedIn };
}

export default function AddBarcode() {
  const actionData = useActionData();
  return (
    <>
      <p>{actionData ? actionData.message : ""}</p>
      <Form method="post">
        <label htmlFor="barcode">barcode:</label>
        <input id="barcode" name="barcode" />
        <br />
        <label htmlFor="product-name">product name:</label>
        <input id="product-name" name="productName" />
        <br />
        <button type="submit">add</button>
      </Form>
    </>
  );
}
