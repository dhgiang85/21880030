import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-[48px]">
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="container flex items-start flex-grow">
        <Sidebar />
        <div className="flex-grow border-l border-neutral-400 h-full flex flex-col ">
          <div className="flex-grow overflow-auto flex flex-col">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
