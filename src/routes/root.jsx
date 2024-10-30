import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const res = await fetch("/hw");
  const { message } = await res.json();

  return { message };
};

export default function Root() {
  const { message } = useLoaderData();

  return <h1>{message}</h1>;
}
