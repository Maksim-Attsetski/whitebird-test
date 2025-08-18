import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./entities/users";
import { postSlice } from "./entities/posts/slice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer,
  },
});
