import { memo, useMemo, type Dispatch, type FC, type SetStateAction } from "react";
import { Button, Card, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { postsApi, priorityList, type IPost } from "@/entities/posts";
import AddPostModal from "./AddPostModal";
import { useTypedDispatch, useTypedSelector } from "@/hooks";
import { routes } from "@/constants";
import { deletePost } from "@/entities/posts/slice";

interface IProps {
  post: IPost | null;
  setPost: Dispatch<SetStateAction<IPost | null>>;
}

const PostDetails: FC<IProps> = ({ post, setPost }) => {
  const [api, context] = notification.useNotification();
  const { user, role } = useTypedSelector((s) => s.users);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const isAllowedChanges = useMemo(() => user?.id === post?.creator_id || role?.name === "admin", []);

  const onPostUpdate = async (newPostData: IPost) => {
    setPost(newPostData);
    api.success({ message: "Успешно обновлено" });
  };

  const onClickDelete = async () => {
    if (post) {
      await postsApi.delete(post?.id);
      dispatch(deletePost(post.id));
      api.success({ message: "Успешно удалено" });
      navigate(routes.posts);
    }
  };

  return (
    <>
      {context}
      <br />
      <Card
        title={`${post?.id}. ${post?.title}`}
        actions={
          isAllowedChanges
            ? [
                <AddPostModal button={<EditOutlined />} onCreate={onPostUpdate} defaultValue={post} />,
                <Button onClick={onClickDelete} type="primary" danger>
                  <DeleteOutlined />
                </Button>,
              ]
            : []
        }
      >
        <Typography.Title level={5}>{post?.description}</Typography.Title>
        <Typography.Title level={5}>
          Приоритет: {post?.priority ? priorityList[post?.priority] : priorityList.NORMAL}
        </Typography.Title>
      </Card>
    </>
  );
};

export default memo(PostDetails);
