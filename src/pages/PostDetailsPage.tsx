import {
  favoritesApi,
  likesApi,
  postsApi,
  type IComment,
  type IFavoritePost,
  type ILikedPost,
  type IPost,
} from "@/entities/posts";
import { commentApi } from "@/entities/posts/api/comments.api";
import { useTypedSelector } from "@/hooks";
import { Button, Card, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <Typography.Title level={4}>post details</Typography.Title>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography>{fullPost?.id}</Typography>
          <Typography>{fullPost?.title}</Typography>
          <Typography>{fullPost?.description}</Typography>
          <Typography>{JSON.stringify(fullPost, null, 8)}</Typography>

          <Button type={isLiked ? "primary" : "default"} onClick={onClickLike}>
            {!!isLiked ? "liked" : "not liked"}
          </Button>
          <Button type={isSaved ? "primary" : "default"} onClick={onClickSave}>
            {!!isSaved ? "saved" : "not saved"}
          </Button>

          <List
            dataSource={comments}
            renderItem={(item) => (
              <Card title={item.title}>
                <Typography>{item?.description}</Typography>
                <Typography style={{ opacity: 0.8 }}>{item.created_at}</Typography>
              </Card>
            )}
          />
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
