import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

import {
  favoritesApi,
  likesApi,
  postsApi,
  commentApi,
  type IComment,
  type IFavoritePost,
  type ILikedPost,
  type IPost,
} from "@/entities/posts";
import { useTypedSelector } from "@/hooks";
import { CommentList, PostActions, PostDetails } from "@/widgets";

const PostDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const { user } = useTypedSelector((s) => s.users);

  const [isLoading, setIsLoading] = useState(true);

  const [isLiked, setIsLiked] = useState<ILikedPost | null>(null);
  const [isSaved, setIsSaved] = useState<IFavoritePost | null>(null);
  const [fullPost, setFullPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  const getPostData = async () => {
    if (!user?.id || !params.id) return;
    setIsLoading(true);

    try {
      const postRes = await postsApi.getOne(Number(params.id));
      setFullPost(postRes);
      const commentsRes = await commentApi.getByPostId(Number(params.id));
      setComments(commentsRes);

      // можно получить несколько , посчитать кол-во лайков
      const res = await likesApi.getOne(user?.id, Number(params.id));
      setIsLiked(res);
      // можно получить несколько , посчитать кол-во сохранёнок
      const favoritesRes = await favoritesApi.getOne(user?.id, Number(params.id));
      setIsSaved(favoritesRes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, [params?.id, user?.id]);

  return (
    <div className="container">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <PostDetails setPost={setFullPost} post={fullPost} />

          <br />
          {/* можно было бы и в компонент перенести все, но так можно управлять состоянием выше, если понадобится */}
          <PostActions
            isLiked={isLiked}
            isSaved={isSaved}
            postId={params.id}
            setIsLiked={setIsLiked}
            setIsLoading={setIsLoading}
            setIsSaved={setIsSaved}
          />
          <br />
          <CommentList comments={comments} postId={params.id} setComments={setComments} />
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
