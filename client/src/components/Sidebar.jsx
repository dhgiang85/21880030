import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActiveLink = (keywords) => {
    return keywords.some((keyword) => location.pathname.startsWith(keyword));
  };

  return (
    <div className="w-44 max-height ">
      <ul className="flex flex-col items-center py-4">
        <li className="w-full ">
          <Link
            exact
            to="/"
            className={
              isActiveLink(["/", "/question"]) && !isActiveLink(["/tags"]) && !isActiveLink(["/users"])
                ? "item-sidebar active"
                : "item-sidebar"
            }
          >
            <i className="fa-solid fa-earth-americas"></i>
            <span className="text-sm">Questions</span>
          </Link>
        </li>
        <li className="w-full ">
          <Link
            to="/tags"
            className={
              isActiveLink(["/tags"])
                ? "item-sidebar active"
                : "item-sidebar"
            }
          >
            <span className="text-sm  ml-6">Tags</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
