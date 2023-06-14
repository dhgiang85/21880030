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
    clearQuestions: (state) => {
      state.questions = [];
      state.count = 0;
      state.numberOfPages = 0;
    },
    clearQuestion: (state) => {
      state.question = null;
    },
    setCurrentQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { setQuestions, setCurrentQuestion, clearQuestions,clearQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
