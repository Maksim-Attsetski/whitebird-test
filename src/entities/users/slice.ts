import { type IRole, type TUser } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  user: TUser;
  role: IRole | null;
}
const initialState: IState = {
  user: null,
  role: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state: IState, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setRole: (state: IState, action: PayloadAction<IRole | null>) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setRole } = userSlice.actions;
