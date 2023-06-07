import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-[48px]">
      <Header />
      <div className="bg-bgMain grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
