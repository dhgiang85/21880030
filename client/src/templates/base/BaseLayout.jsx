import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const BaseLayout = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-[48px]">
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BaseLayout;
