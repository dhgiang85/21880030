import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const SmallQuestion = ({ question, hsAuthor }) => {
  const {
    answers,
    title,
    tags,
    createdAt,
    _id,
    viewNumber,
    voteDown,
    voteUp,
    isSolved,
  } = question;
  return (
    <div className="flex-grow space-y-2 p-3">
      <div className="flex items-center space-x-2 text-sm text-neutral-500 p-0">
        <p>{voteDown.length + voteUp.length} votes</p>
        <p
          className={
            answers.length > 0
              ? `border rounded border-green-800 text-green-800 p-0 px-1 inline-block ${
                  isSolved ? "bg-green-800 text-white" : ""
                }`
              : ""
          }
        >
          {answers.length} answers
        </p>
        <p>{viewNumber} views</p>
      </div>

      <div className="flex-grow space-y-2">
        <Link
          to={`/question/${_id}`}
          className="text-primary text-base line-clamp-1"
        >
          {title}
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tags.map((tag) => (
              <p className="px-2 py-1 bg-neutral-200 rounded-sm text-primary text-sm hover:bg-neutral-600 hover:text-white transition-all duration-500">
                {tag.name}
              </p>
            ))}
          </div>
          {/* user & timestamp */}
        </div>
        <div className="flex items-center space-x-2 justify-end">
          <p className="text-sm text-neutral-500">
            asked
            <span className="text-neutral-800 mx-1">
              {moment(createdAt).fromNow()}
            </span>
          </p>
          {hsAuthor && (
            <>
              by
              <Link
                to={`/profile/${question.owner?._id}`}
                className="flex items-center space-x-2 text-sm text-primary hover:text-neutral-800 transition-all duration-500"
              >
                <img
                  src={
                    question.owner?.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt="avatar"
                  className="object-cover w-6 h-6 rounded-full mr-2"
                />
                {question.owner?.username}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallQuestion;
