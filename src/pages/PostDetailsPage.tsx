import { useEffect, useState } from "react";
import { FolderFilled, FolderOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Button, Flex, Typography } from "antd";

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
import { CommentList } from "@/widgets";

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

      const res = await likesApi.getOne(user?.id, Number(params.id));
      setIsLiked(res);
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

  const onClickLike = async () => {
    try {
      setIsLoading(true);
      if (!!isLiked) {
        await likesApi.delete(isLiked?.id);
        setIsLiked(null);
      } else {
        const res = await likesApi.create({
          post_id: Number(params.id),
          user_id: user?.id,
        });
        setIsLiked(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSave = async () => {
    try {
      setIsLoading(true);
      if (isSaved) {
        await favoritesApi.delete(isSaved?.id);
        setIsSaved(null);
      } else {
        const res = await favoritesApi.create({
          post_id: Number(params.id),
          user_id: user?.id,
        });
        setIsSaved(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography.Title level={3}>
            {fullPost?.id}. {fullPost?.title}
          </Typography.Title>
          <Typography.Title level={5}>{fullPost?.description}</Typography.Title>
          <Typography.Title level={5}>Приоритет: {fullPost?.priority}</Typography.Title>

          <br />
          <Flex align="center" gap={12}>
            <Button type={isLiked ? "primary" : "default"} onClick={onClickLike}>
              {isLiked ? <HeartFilled /> : <HeartOutlined />}
            </Button>
            <Button type={isSaved ? "primary" : "default"} onClick={onClickSave}>
              {isSaved ? <FolderFilled /> : <FolderOutlined />}
            </Button>
          </Flex>
          <br />
          <CommentList comments={comments} postId={params.id} setComments={setComments} />
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
