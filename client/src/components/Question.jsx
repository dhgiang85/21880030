import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
const Question = ({ question }) => {
  const {
    answers,
    title,
    content,
    tags,
    createdAt,
    _id,
    owner,
    viewNumber,
    voteDown,
    voteUp,
    isSolved,
  } = question;
  return (
    <div className="flex p-3 border-b max-w-4xl">
      <div className="w-28 shrink-0 mr-4 ">
        <div className="space-y-2 text-sm text-neutral-500 p-1 text-right">
          <p>{voteDown.length + voteUp.length} votes</p>
          <p
            className={
              answers.length > 0
                ? `border rounded border-green-800 text-green-800 p-1 inline-block ${
                    isSolved ? "bg-green-800 text-white" : ""
                  }`
                : ""
            }
          >
            {answers.length} answers
          </p>
          <p>{viewNumber} views</p>
        </div>
      </div>

      <div className="flex-grow space-y-2">
        <Link
          to={`/question/${_id}`}
          className="text-primary text-lg line-clamp-1"
        >
          {title}
        </Link>
        <div
          className="text-base line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tags.map((tag) => (
              <Link
                to={`/question/tag/${tag._id}`}
                className="px-2 py-1 bg-neutral-200 rounded-sm text-primary text-sm hover:bg-neutral-600 hover:text-white transition-all duration-500"
              >
                {tag.name}
              </Link>
            ))}
          </div>
          {/* user & timestamp */}
          <div className="flex items-center space-x-2">
            <Link
              to={`/profile/${owner._id}`}
              className="flex items-center space-x-2 text-sm text-primary hover:text-neutral-800 transition-all duration-500"
            >
              <img
                src={
                  owner.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt="avatar"
                className="object-cover w-6 h-6 rounded-full mr-2"
              />
              {owner.username}
            </Link>
            <p className="text-sm text-neutral-500">
              asked {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
