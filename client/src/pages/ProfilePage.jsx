import React from "react";
import moment from "moment";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
const ProfilePage = ({ user }) => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  return (
    <div className=" max-w-4xl mb-4">
      <div className="flex p-4 mb-2 border-b">
        <div className=" h-32 w-32 bg-slate-300 ring-2 overflow-hidden shrink-0">
          <img
            src={
              user.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt="avatar"
            className="object-cover w-full h-full "
          />
        </div>
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-base text-neutral-500">{user.email}</p>
          {/* date register use moment*/}
          <p className="text-sm text-neutral-400 mt-6">
            <i className="fa-solid fa-cake-candles fa-lg mr-2"></i> Member for
            <span className="ml-1 text-neutral-700">{moment(user.createdAt).fromNow()}</span>
          </p>
        </div>
        {/* edite profile */}
        {/* <div className="ml-auto">
          <button className="btn-secondary">
            <i className="fa-solid fa-pencil mr-2"></i>Edit Profile
          </button>
        </div> */}
      </div>
      {/* action: answer/ question and saves */}
      <div className="flex items-center justify-between p-4 ">
        <div className="flex items-center space-x-4 ">
          <Link
            to={`/users/${user._id}`}
            // className="flex items-center space-x-2 text-neutral-500 hover:text-primary transition-all"
            className={`flex items-center space-x-2 border-b-4 pb-2  hover:text-primary transition-all ${
              isActiveLink(`/users/${user._id}`)
                ? "text-primary  border-cyan-600 "
                : "text-neutral-500 border-transparent"
            }`}
          >
            <i className="fa-solid fa-question-circle fa-lg "></i>
            <p className="text-sm">Questions</p>
          </Link>
          <Link
            to={`/users/${user._id}/answers`}
            className={`flex items-center space-x-2 border-b-4 pb-2  hover:text-primary transition-all ${
              isActiveLink(`/users/${user._id}/answers`)
                ? "text-primary border-cyan-600"
                : "text-neutral-500 border-transparent"
            }`}
          >
            <i className="fa-solid fa-comment-dots fa-lg "></i>
            <p className="text-sm">Answers</p>
          </Link>
          <Link
            to={`/users/${user._id}/saves`}
            
            className={`flex items-center space-x-2 border-b-4 pb-2 hover:text-primary transition-all ${
              isActiveLink(`/users/${user._id}/saves`)
                ? "text-primary border-cyan-600"
                : "text-neutral-500 border-transparent"
            }`}
          >
            <i className="fa-solid fa-bookmark fa-lg "></i>
            <p className="text-sm">Saves</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
