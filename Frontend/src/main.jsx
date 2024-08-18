import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import myntrastore from "./store/index";
import Home from "./routes/Home";

import Bag from "../src/Component/Bag";

import ShowCategoryWise from "./routes/catgories/ShowCategoryWise";

import User from "./routes/user/User";

import AddressForm from "../src/Component/AddressForm";

import ProductDetailsHome from "./routes/ProductDetailsHome";
import { Provider } from "react-redux";
import PaymentHomePage from "./routes/Payment/PaymentHomePage";
import ShowBrand from "./routes/brand/ShowBrand";
import { Login } from "./routes/Login";
import { LoginPage } from "./routes/user/LoginPage";
import OrderHistory from "./routes/user/OrderHistory";
import OrderDetails from "./routes/user/OrderDetails";
import AdminDashBoard from "./routes/admin/AdminDashBoard";
import CreateProduct from "./routes/admin/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Bag",
        element: <Bag />,
      },
      {
        path: "/showCategory/:name",
        element: <ShowCategoryWise />,
      },
      {
        path: "/user/:name",
        element: <User />,
      },
      {
        path: "/addressForm",
        element: <AddressForm />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetailsHome />,
      },
     
      {
        path: "/payment",
        element: <PaymentHomePage />,
      },
      {
        path: "/showbrand/:name",
        element: <ShowBrand />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/orderHistory",
        element: <OrderHistory />,
      },
      {
        path: "/orderDetails/:id",
        element: <OrderDetails />,
      },
      {
        path: "/admindashboard",
        element: <AdminDashBoard />,
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
