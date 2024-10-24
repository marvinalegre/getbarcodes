import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND}/barcodes`);
  const barcodes = await res.json();

  return { barcodes };
}

export default function Barcodes() {
  const { barcodes } = useLoaderData();
  const columns = ["barcode", "product name", "contributor"];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {barcodes.map((row) => (
          <tr key={row.id}>
            {Object.values(row)
              .slice(1)
              .map((value, valueIndex) => (
                <td key={valueIndex}>{value}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
