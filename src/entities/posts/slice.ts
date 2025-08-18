import { type IFavoritePost, type ILikedPost, type IPost } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  posts: IPost[];
  likedPosts: ILikedPost[];
  favoritesPosts: IFavoritePost[];
}
const initialState: IState = {
  posts: [],
  favoritesPosts: [],
  likedPosts: [],
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setPosts: (state: IState, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setLikes: (state: IState, action: PayloadAction<ILikedPost[]>) => {
      state.likedPosts = action.payload;
    },
    setFavorites: (state: IState, action: PayloadAction<IFavoritePost[]>) => {
      state.favoritesPosts = action.payload;
    },
  },
});

export const { setFavorites, setLikes, setPosts } = postSlice.actions;
