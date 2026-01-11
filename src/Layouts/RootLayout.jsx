import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
