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
import SignUp, {
  action as signUpAction,
  loader as signUpLoader,
} from "./routes/signup";
import Logout, { loader as logoutLoader } from "./routes/logout";
import AddBarcode, { action as addAction } from "./routes/add";
import Barcode, { loader as barcodeLoader } from "./routes/barcode";

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
        path: "/signup",
        element: <SignUp />,
        action: signUpAction,
        loader: signUpLoader,
      },
      {
        path: "/logout",
        element: <Logout />,
        loader: logoutLoader,
      },
      {
        path: "/add",
        element: <AddBarcode />,
        action: addAction,
      },
      {
        path: "/b/:barcode",
        element: <Barcode />,
        loader: barcodeLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
