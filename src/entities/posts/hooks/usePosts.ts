import { useTypedDispatch, useTypedSelector } from "@/hooks";
import type { IPost } from "../types";
import { postsApi, type IPostFilters } from "../api/post.api";
import { setPosts } from "../slice";
import { useState } from "react";

export const usePosts = () => {
  const { posts } = useTypedSelector((s) => s.posts);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useTypedDispatch();

  const getPosts = async (filters: IPostFilters) => {
    try {
      setIsLoading(true);
      const res = await postsApi.getWithFilters(filters);
      res && dispatch(setPosts(res));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (data: IPost) => {
    const res = await postsApi.create(data);
    res && dispatch(setPosts([...posts, res]));
  };

  const updatePost = async (data: Partial<IPost>) => {
    const res = await postsApi.update(data);
    res && dispatch(setPosts([...posts].map((p) => (p.id ? res : p))));
  };

  const deletePost = async (id: IPost["id"]) => {
    await postsApi.delete(id);
    dispatch(setPosts(posts.filter((p) => p.id !== id)));
  };

  return { isLoading, getPosts, addPost, updatePost, deletePost, posts };
};
