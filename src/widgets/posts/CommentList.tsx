import { useMemo, type Dispatch, type FC, type SetStateAction } from "react";
import { Button, Card, List, notification, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { commentApi, type IComment } from "@/entities/posts";
import { useTypedSelector } from "@/hooks";

import AddCommentModal from "./AddCommentModal";

interface IProps {
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  postId?: string;
}

const CommentList: FC<IProps> = ({ comments, setComments, postId }) => {
  const [notify, notifyContext] = notification.useNotification();

  const { role, user } = useTypedSelector((s) => s.users);
  const onCreateComment = async (comment: IComment) => {
    setComments((prev) => [comment, ...prev]);
    notify.success({ message: "Успешно создано" });
  };
  const onUpdateComment = async (comment: IComment) => {
    setComments((prev) => prev.map((c) => (c.id === comment.id ? comment : c)));
    notify.success({ message: "Успешно обновлено" });
  };
  const onDeleteComment = async (id: IComment["id"]) => {
    await commentApi.delete(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
    notify.success({ message: "Успешно удалено" });
  };

  const myCommentsLength = useMemo(
    () => comments.filter((c) => c.creator_id === user?.id).length,
    [user?.id, comments]
  );

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => Number(b.creator_id === user?.id) - Number(a.creator_id === user?.id)),
    [comments, user?.id]
  );

  return (
    <>
      {notifyContext}
      {myCommentsLength === 0 && <AddCommentModal onCreate={onCreateComment} postId={Number(postId)} />}

      <List
        dataSource={sortedComments}
        header={<Typography.Title level={4}>Комменты ({comments.length})</Typography.Title>}
        renderItem={(item) => (
          <Card
            actions={
              role?.name === "admin" || item.creator_id === user?.id
                ? [
                    <AddCommentModal
                      button={<EditOutlined />}
                      onCreate={onUpdateComment}
                      postId={item.post_id}
                      defaultValue={item}
                    />,
                    <Button type="primary" onClick={() => onDeleteComment(item.id)} danger>
                      <DeleteOutlined />
                    </Button>,
                  ]
                : []
            }
            style={{ margin: "12px 0" }}
            title={`${item.title} ${item.creator_id === user?.id ? "(Ваш)" : ""}`}
          >
            <Typography>{item?.description}</Typography>
            <Typography style={{ opacity: 0.8 }}>{item.created_at}</Typography>
          </Card>
        )}
      />
    </>
  );
};

export default CommentList;
