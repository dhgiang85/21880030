import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="container flex items-start flex-grow ">
        <Sidebar />
        <div className="flex-grow border-l border-neutral-400 flex flex-col max-w-4xl max-height">
          <Outlet />
        </div>
      </div>
  );
};

export default MainLayout;
