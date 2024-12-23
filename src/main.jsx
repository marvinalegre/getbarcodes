import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, { loader as rootLoader } from "./routes/root";
import Barcodes, { loader as indexLoader } from "./routes/index";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/login";
import Logout, { loader as logoutLoader } from "./routes/logout";
import SignUp, {
  action as signUpAction,
  loader as signUpLoader,
} from "./routes/signup";
import AddBarcode, { action as addAction } from "./routes/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Barcodes />,
        loader: indexLoader,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: "/logout",
        element: <Logout />,
        loader: logoutLoader,
      },
      {
        path: "/signup",
        element: <SignUp />,
        action: signUpAction,
        loader: signUpLoader,
      },
      {
        path: "/add",
        element: <AddBarcode />,
        action: addAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
