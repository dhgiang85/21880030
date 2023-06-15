import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const SmallAnswer = ({ answer, question }) => {
  const { content, createdAt, voteDown, voteUp, isAccepted } = answer;

  return (
    <div className="flex-grow space-y-2 p-3 max-w-[670.4px]">
       <div className="flex items-center justify-between">
          {/* user & timestamp */}
          <div className="flex items-center space-x-2 text-sm text-neutral-500 p-0">
            <p>{voteDown.length + voteUp.length} votes</p>
            <p
              className={`border rounded-md py-1 px-2 ${
                isAccepted ? "bg-primary text-white" : ""
              }`}
            >
              accepted
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-neutral-500">
              answer
              <span className="text-neutral-800 ml-1">
                {moment(createdAt).fromNow()}
              </span>
            </p>
          </div>
        </div>

      <div className="flex-grow space-y-2">
        <Link
          to={`/question/${question?._id}`}
          className="text-primary text-base line-clamp-1"
        >
          {question?.title}
        </Link>
        <div className="p-2 border-l-4 border-neutral-500">
          <div
            className="text-base line-clamp-2  "
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>

       
      </div>
    </div>
  );
};

export default SmallAnswer;
