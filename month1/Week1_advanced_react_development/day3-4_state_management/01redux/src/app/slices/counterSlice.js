import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
    },
    reducers: {
        increament: (state) => {
            state.count += 1;
        },
        descrement: (state) => {
            state.count -= 1;
        },
    },
});

export const { increament, descrement } = counterSlice.actions;

export default counterSlice.reducer;
