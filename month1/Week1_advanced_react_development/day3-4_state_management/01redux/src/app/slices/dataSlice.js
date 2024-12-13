import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
    try {
        const response = await fetch("https://api.github.com/users/ma3llim007");
        return response.json();
    } catch (error) {
        throw error;
    }
});

const dataSlice = createSlice({
    name: "data",
    initialState: { value: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.value = action.payload;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default dataSlice.reducer;
