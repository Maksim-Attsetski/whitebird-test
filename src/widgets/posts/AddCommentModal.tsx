import { useState, type FC, type ReactNode } from "react";
import { Button, Input, Modal, Typography } from "antd";

import { commentApi, type IComment, type IPost } from "@/entities/posts";
import { useTypedSelector } from "@/hooks";

interface IProps {
  onCreate: (c: IComment) => Promise<void>;
  postId: IPost["id"];
  defaultValue?: IComment;
  button?: ReactNode;
}

const AddCommentModal: FC<IProps> = ({ onCreate, postId, defaultValue, button }) => {
  const { user } = useTypedSelector((s) => s.users);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string>(defaultValue?.title || "");
  const [description, setDescription] = useState<string>(defaultValue?.description || "");
  const [errMessage, setErrMessage] = useState<string>("");

  const onCloseModal = () => {
    setIsOpened(false);
  };

  const onCreateComment = async () => {
    if (title.length === 0) {
      setErrMessage("Заголовок обязательный");
      return;
    }
    try {
      setIsLoading(true);

      if (defaultValue) {
        const res = await commentApi.update({
          title,
          description,
          id: defaultValue?.id,
        });
        res && (await onCreate(res));
      } else {
        const res = await commentApi.create({
          post_id: postId,
          creator_id: user?.id,
          title,
          description,
        });
        res && (await onCreate(res));
      }
      onCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsOpened(true)}>
        {button ?? (defaultValue ? "Обновить" : "Добавить" + " коммент")}
      </Button>

      <Modal
        loading={isLoading}
        open={isOpened}
        footer={() => (
          <>
            <Button onClick={onCloseModal}>Закрыть</Button>
            <Button type="primary" onClick={onCreateComment}>
              {defaultValue ? "Сохранить" : "Добавить"}
            </Button>
          </>
        )}
      >
        <br />
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrMessage("");
          }}
          placeholder="Заголовок"
        />
        {errMessage ? (
          <Typography defaultValue={defaultValue?.title} style={{ color: "#e55" }}>
            {errMessage}
          </Typography>
        ) : (
          <br />
        )}
        <br />
        <Input.TextArea
          value={description}
          defaultValue={defaultValue?.description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
        />
      </Modal>
    </>
  );
};

export default AddCommentModal;
