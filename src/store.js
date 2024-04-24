import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./store/taskReducer";
export default configureStore({
    reducer: {
        tasks: taskReducer
    },
});