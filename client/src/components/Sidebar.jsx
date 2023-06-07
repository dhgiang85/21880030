import React from "react";

const Sidebar = () => {
  return (
    <div className="w-44 max-height ">
      <ul className="flex flex-col items-center py-4">
        <li className="w-full ">
          <a
            href="/"
            className="item-sidebar active"
          >
           <i className="fa-solid fa-earth-americas"></i>
            <span className="text-sm">Questions</span>
          </a>
        </li>
        <li className="w-full ">
          <a
            href="/"
            className="item-sidebar ml-6"
          >
            <span className="text-sm ">Tags</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
