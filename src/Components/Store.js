import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../Slices/blogsSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});
