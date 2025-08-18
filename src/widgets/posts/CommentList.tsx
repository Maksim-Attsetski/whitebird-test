import { useMemo, type Dispatch, type FC, type SetStateAction } from "react";
import { Button, Card, List, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { type IComment } from "@/entities/posts";
import { useTypedSelector } from "@/hooks";

import AddCommentModal from "./AddCommentModal";

interface IProps {
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  postId?: string;
}

const CommentList: FC<IProps> = ({ comments, setComments, postId }) => {
  const { role, user } = useTypedSelector((s) => s.users);
  const onCreateComment = async (comment: IComment) => {
    setComments((prev) => [comment, ...prev]);
  };
  const onUpdateComment = async (comment: IComment) => {
    setComments((prev) => prev.map((c) => (c.id === comment.id ? comment : c)));
  };
  const onDeleteComment = async (id: IComment["id"]) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const myCommentsLength = useMemo(
    () => comments.filter((c) => c.creator_id === user?.id).length,
    [user?.id, comments]
  );

  return (
    <>
      {myCommentsLength === 0 && <AddCommentModal onCreate={onCreateComment} postId={Number(postId)} />}

      <List
        dataSource={comments}
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
