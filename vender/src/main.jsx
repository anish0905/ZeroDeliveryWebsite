import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import myntrastore from "./store/index";

import { Provider } from "react-redux";

import { LoginPage } from "./routes/admin/LoginPage";

import AdminDashBoard from "./routes/admin/AdminDashBoard";
import CreateProduct from "./routes/admin/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AdminDashBoard />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/createProduct",
        element: <CreateProduct />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={myntrastore}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
