import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";


const AuthLayout = () => {
  return (
    <div className="max-w-7xl  mx-auto ">
      <Navbar></Navbar>
      <div className="flex items-center mt-20 ">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
       <Footer></Footer>
      </div>
    </div>
  );
};

export default AuthLayout;