import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/todos/counterSlice";


const store=configureStore({
    reducer:{
        counter:counterReducer,
    }
})

export default store;