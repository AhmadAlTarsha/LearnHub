import React from "react";
import NavbarR from "../components/navBar";
import Footer from "../components/footer";
import WelcomePage from "../components/welcome";


function HomePage() {
  return (
    <div>
      <NavbarR />
    <WelcomePage/>
      <Footer />
    </div>
  );
}

export default HomePage;
