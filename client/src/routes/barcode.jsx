import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const editRoute = `/b/${params.barcode}/edit`;

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND}/auth/barcode/${params.barcode}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const { productName, err, loggedIn } = await res.json();

  return { editRoute, productName, barcode: params.barcode, err, loggedIn };
}

export default function Barcode() {
  const { editRoute, productName, barcode, err, loggedIn } = useLoaderData();

  return (
    <>
      {err ? (
        <p>{err}</p>
      ) : (
        <>
          <p>barcode: {barcode}</p>
          <p>product name: {productName}</p>
        </>
      )}

      <p>(edit history)</p>

      {loggedIn ? <Link to={editRoute}>Edit</Link> : null}
    </>
  );
}
