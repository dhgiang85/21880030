import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPT_ANSWER_API,
  MARK_ANSWER_API,
  VOTE_ANSWER_API,
} from "../features/answer/answerApiSlice";
import { Link } from "react-router-dom";
import moment from "moment";

const Answer = ({ answer, flagAccept, isSolved }) => {
  const dispatch = useDispatch();
  const {
    content,
    createdAt,
    _id,
    owner,
    voteDown,
    updatedAt,
    voteUp,
    bookmark,
    isAccepted,
  } = answer;
  const { user } = useSelector((state) => state.auth);
  const handleVote = ({ id, vote }) => {
    dispatch({
      type: VOTE_ANSWER_API,
      payload: { id, type: vote },
    });
  };
  const isMark = bookmark?.find((item) => item === user?._id);
  const handleMark = (id) => {
    dispatch({
      type: MARK_ANSWER_API,
      payload: { id },
    });
  };
  const handleAccept = (id) => {
    dispatch({
      type: ACCEPT_ANSWER_API,
      payload: { id },
    });
  };
  return (
    <>
      {content && (
        <div className="h-full flex-grow ">
          <div className="flex items-start p-4 max-w-4xl border-b shadow-sm">
            <div className="w-16 flex-shrink-0 space-y-4 flex flex-col items-center  ">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full border pt-3 hover:bg-orange-200 cursor-pointer "
                onClick={() =>
                  handleVote({
                    id: _id,
                    vote: "up",
                  })
                }
              >
                <i className="fa-solid fa-sort-up fa-xl"></i>
              </div>
              <p className="text-center text-lg">
                {voteUp.length - voteDown.length}
              </p>
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full border pb-3 hover:bg-orange-200 cursor-pointer"
                onClick={() =>
                  handleVote({
                    id: _id,
                    vote: "down",
                  })
                }
              >
                <i className="fa-solid fa-sort-down fa-xl"></i>
              </div>
              {!isSolved | isAccepted && (
                <div
                  className={`${
                    isAccepted
                      ? "text-primary"
                      : "text-neutral-800 hover:text-primary transition-all duration-500"
                  } cursor-pointer `}
                  onClick={() => handleAccept(_id)}
                >
                  <i className="fa-solid fa-check fa-xl"></i>
                </div>
              )}
            </div>
            {/* content */}
            <div className="flex-grow h-full flex flex-col justify-between">
              <div
                className="text-sm min-h-[120px]"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
              <div className="flex-grow"></div>
              {/* more information */}
              <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center justify-center text-neutral-400 space-x-3">
                  <p>
                    Answered at
                    <span className="text-neutral-700 ml-2">
                      {moment(createdAt).fromNow()}
                    </span>
                  </p>
                  <p>
                    Modified at
                    <span className="text-neutral-700 ml-2">
                      {moment(updatedAt).fromNow()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/profile/${owner?._id}`}
                    className="flex items-center space-x-2 text-sm text-primary hover:text-neutral-800 transition-all duration-500"
                  >
                    <img
                      src={
                        owner?.avatar ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt="avatar"
                      className="object-cover w-6 h-6 rounded-full mr-2"
                    />
                    {owner?.username}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Answer;
