import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  question: {},
  count: 0,
  numberOfPages: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
      state.count = action.payload.count;
      state.numberOfPages = action.payload.numberOfPages;
    },
    setCurrentQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { setQuestions, setCurrentQuestion } = questionSlice.actions;
export default questionSlice.reducer;
