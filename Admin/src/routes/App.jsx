import React from "react";
import NavBar1 from "../Component/NavBar/NavBar1";
import Footer from "../Component/Footer";
import ScrollButton from "../Component/scrollToTop";
import { Outlet } from "react-router-dom";

import "../App.css";


const App = () => {
  return (
    <div>

      <NavBar1 />

      <Outlet />

      <Footer />
      <ScrollButton />
    </div>
  );
};

export default App;
