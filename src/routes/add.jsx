import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const res = await fetch("/api/add", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      barcode: formData.get("barcode"),
      productName: formData.get("productName"),
    }),
  });
  const { success, err } = await res.json();

  if (success) {
    return redirect("/");
  } else {
    return { err };
  }
}

export default function AddBarcode() {
  const actionData = useActionData();
  return (
    <>
      <p>{actionData ? actionData.err : ""}</p>
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