import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  answer: {},
  count: 0,
  numberOfPages: 0,
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload?.answers;
      state.count = action.payload?.count;
      state.numberOfPages = action.payload?.numberOfPages;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    clearAnswer: (state) => {
      state.answers = [];
      state.count = 0;
      state.numberOfPages = 0;
    },
  },
});

export const { setAnswers, clearAnswer, setAnswer } = answerSlice.actions;

export default answerSlice.reducer;
