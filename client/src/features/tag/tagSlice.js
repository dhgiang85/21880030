import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [],
    tag:{},
    count: 0,
    numberOfPages: 0,
}

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload.tags;
            state.count = action.payload.count;
            state.numberOfPages = action.payload.numberOfPages;
        },
        setTag: (state, action) => {
            state.tag = action.payload;
        },
        clearTags: (state, action) => {
            state.tags = [];
            state.count = 0;
            state.numberOfPages = 0;
        },
    }
});

export const { setTags, clearTags,setTag } = tagSlice.actions;
export default tagSlice.reducer;
