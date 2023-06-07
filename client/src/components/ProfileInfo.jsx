import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_API } from "../features/auth/authApiSlice";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <>
      {user ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* <!-- Profile dropdown --> */}
          <div className="relative ml-3 " onClick={togglePopup}>
            <div className="flex items-center justify-center space-x-4">
              <div className="rounded-full h-9 w-9 bg-slate-300 ring-2 overflow-hidden ring-secondary">
                <img
                  src={
                    user.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt="avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              <p className="font-bold text-neutral-800 cursor-pointer">
                {user.username}
              </p>
            </div>

            <div
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                showPopup ? "block" : "hidden"
              }`}
              role="menu"
            >
              {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-0"
              >
                Your Profile
              </Link>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-2"
                onClick={() => {
                  dispatch({
                    type: LOGOUT_API,
                  });
                  navigate("/");
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Link to="/user/login" className="btn-secondary">
            Log in
          </Link>
          <Link to="/user/register" className="btn-primary">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
