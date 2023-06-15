import React from "react";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-bgMain grow">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
