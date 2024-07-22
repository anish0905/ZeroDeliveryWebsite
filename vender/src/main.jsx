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
import OrderHomePage from "./routes/AllOrder.jsx/OrderHomePage";
import ProductHome from "./routes/AllProduct.jsx/ProductHome";
import  Register  from "../src/Component/Register";
import OtpVerification from "./Component/OtpVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <AdminDashBoard />,
      },

      {
        path: "/",
        element: <LoginPage />,
      },

      {
        path: "/createProduct",
        element: <CreateProduct />,
      },
      {
        path: "/orders",
        element: <OrderHomePage />,
      },
      {
        path: "/products",
        element: <ProductHome />,
      },
      {
        path: "/vendorregister",
        element: <Register/>,
      },
      {
        path: "/otpVerification",
        element: <OtpVerification/>,
      }
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
