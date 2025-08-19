import { memo, useMemo, useState, type FC, type ReactNode } from "react";
import { Button, Form, Input, Modal, Select, Typography } from "antd";

import { EPostPriority, postsApi, priorityList, type IPost } from "@/entities/posts";
import { useTypedSelector } from "@/hooks";

interface IProps {
  onCreate: (c: IPost) => Promise<void>;
  defaultValue?: IPost | null;
  button?: ReactNode;
}

const AddPostModal: FC<IProps> = ({ onCreate, defaultValue, button }) => {
  const { user } = useTypedSelector((s) => s.users);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string>(defaultValue?.title || "");
  const [description, setDescription] = useState<string>(defaultValue?.description || "");
  const [priority, setPriority] = useState<EPostPriority>(defaultValue?.priority || EPostPriority.NORMAL);
  const [errMessage, setErrMessage] = useState<string>("");

  const onCloseModal = () => {
    setTitle(defaultValue?.title || "");
    setDescription(defaultValue?.description || "");
    setPriority(defaultValue?.priority || EPostPriority.NORMAL);
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
        const res = await postsApi.update({
          title,
          description,
          id: defaultValue?.id,
          priority,
        });
        res && (await onCreate(res));
      } else {
        const res = await postsApi.create({
          creator_id: user?.id,
          title,
          description,
          priority: EPostPriority.NORMAL,
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

  const options = useMemo(
    () => Object.keys(priorityList).map((k) => ({ value: k, label: priorityList[k as EPostPriority] })),
    []
  );

  return (
    <>
      <Button type="primary" onClick={() => setIsOpened(true)}>
        {button ?? (defaultValue ? "Обновить" : "Добавить" + " пост")}
      </Button>

      <Modal
        loading={isLoading}
        open={isOpened}
        footer={() => (
          <>
            <Button onClick={onCloseModal}>Закрыть</Button>
            <Button type="primary" onClick={onCreateComment}>
              Сохранить
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
          maxLength={100}
          allowClear
        />
        {errMessage ? (
          <Typography defaultValue={defaultValue?.title} style={{ color: "#e55" }}>
            {errMessage}
          </Typography>
        ) : (
          <br />
        )}
        <br />
        <div>
          <Input.TextArea
            value={description}
            defaultValue={defaultValue?.description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            rows={5}
            maxLength={500}
            allowClear
          />
        </div>
        <br />
        <Form.Item label="Приоритет">
          <Select
            value={priority}
            options={options}
            defaultValue={defaultValue?.priority}
            onChange={(_, o) => {
              const newValue = Array.isArray(o) ? o.at(0)?.value : o?.value;
              newValue && setPriority(newValue as EPostPriority);
            }}
            placeholder="Описание"
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default memo(AddPostModal);
