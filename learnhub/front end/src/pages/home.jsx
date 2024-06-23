import React from "react";
import NavbarR from "../components/navBar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";


function HomePage() {
  return (
    <div>
      <NavbarR />
      <Outlet />

      <Footer />
    </div>
  );
}

export default HomePage;
