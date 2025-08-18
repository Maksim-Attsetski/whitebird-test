import { type TUser } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  user: TUser;
}
const initialState: IState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state: IState, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
