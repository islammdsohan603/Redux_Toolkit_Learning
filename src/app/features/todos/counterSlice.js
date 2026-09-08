const { createSlice } = require("@reduxjs/toolkit");

export const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        increment: state => {
            state.count = state.count + 1;
        },
        decreiments: state => {
            state.count = state.count - 1;
        },
        reset: state => {
            state.count = state.count = 0;
        }
    }
})

export const { increment, decreiments, reset } = counterSlice.actions;

export default counterSlice.reducers;