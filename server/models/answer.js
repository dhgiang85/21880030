// answer for question stackoverflow mongoose
import mongoose from "mongoose";
const { Schema } = mongoose;
const answerSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    voteUp: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    voteDown: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    bookmark: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    isAccepted: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
    },
    countVoteUp: {
        type: Number,
        default: 0,
    },
    countVoteDown: {
        type: Number,
        default: 0,
    },

},{
    timestamps: true,
});
// middleware to update countVoteUp and countVoteDown
answerSchema.pre("save", function (next) {
    this.countVoteUp = this.voteUp.length;
    this.countVoteDown = this.voteDown.length;
    next();
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
