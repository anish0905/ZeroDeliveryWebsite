import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./routes/Home";
import myntrastore from "./store";
import { Provider } from 'react-redux';
import Bag from "./Component/Bag";
import ShowCategoryWise from "./routes/ShowCategoryWise";
import User from "./routes/page/User";
import AddressForm from "./Component/AddressForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Bag",
        element: <Bag />
      },
      {
        path: "/showCategory/:name",
        element: <ShowCategoryWise/>
      },
      {
        path: "/user/:name",
        element: <User/>
      },
      {
        path: "/addressForm",
        element: <AddressForm/>
      }
      
    ]
  }
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
