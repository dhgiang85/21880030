import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [],
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
        }
    }
});

export const { setTags } = tagSlice.actions;
export default tagSlice.reducer;
