import { favoritesApi, likesApi, type IFavoritePost, type ILikedPost } from "@/entities/posts";
import { useTypedSelector } from "@/hooks";
import { FolderFilled, FolderOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { memo, type Dispatch, type FC, type SetStateAction } from "react";

interface IProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLiked: Dispatch<SetStateAction<ILikedPost | null>>;
  isLiked: ILikedPost | null;
  setIsSaved: Dispatch<SetStateAction<IFavoritePost | null>>;
  isSaved: ILikedPost | null;
  postId?: string;
}

const PostActions: FC<IProps> = ({ setIsLoading, isLiked, setIsLiked, isSaved, setIsSaved, postId }) => {
  const { user } = useTypedSelector((s) => s.users);
  const onClickLike = async () => {
    try {
      setIsLoading(true);
      if (!!isLiked) {
        await likesApi.delete(isLiked?.id);
        setIsLiked(null);
      } else {
        const res = await likesApi.create({
          post_id: Number(postId),
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
          post_id: Number(postId),
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
    <Flex align="center" gap={12}>
      <Button type={isLiked ? "primary" : "default"} onClick={onClickLike}>
        {isLiked ? <HeartFilled /> : <HeartOutlined />}
      </Button>
      <Button type={isSaved ? "primary" : "default"} onClick={onClickSave}>
        {isSaved ? <FolderFilled /> : <FolderOutlined />}
      </Button>
    </Flex>
  );
};

export default memo(PostActions);
