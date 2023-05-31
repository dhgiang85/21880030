// question stackoverflow mongoose

import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    content: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    voteUp: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    voteDown: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmark: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    viewNumber: {
      type: Number,
      default: 0,
    },
    countVoteUp: {
      type: Number,
    },
    countVoteDown: {
      type: Number,
    },

  },
  {
    timestamps: true,
  }
);
// middleware check vote up
questionSchema.pre("save", function (next) {
    this.countVoteUp = this.voteUp.length;
    next();
    }
);
// middleware check vote down
questionSchema.pre("save", function (next) {
    this.countVoteDown = this.voteDown.length;
    next();
    }
);


const Question = mongoose.model("Question", questionSchema);

export default Question;