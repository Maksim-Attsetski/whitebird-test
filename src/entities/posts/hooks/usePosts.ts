import { useTypedDispatch, useTypedSelector } from "@/hooks";
import type { IPost } from "../types";
import { postsApi } from "../api/post.api";
import { setPosts } from "../slice";

export const usePosts = () => {
  const { posts } = useTypedSelector((s) => s.posts);
  const dispatch = useTypedDispatch();

  const getPosts = async () => {
    const res = await postsApi.get();
    res && dispatch(setPosts(res));
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

  return { getPosts, addPost, updatePost, deletePost, posts };
};
