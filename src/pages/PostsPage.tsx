import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Flex, Input, List, Select, Typography } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import { usePosts, setPosts, EPostPriority, type IPost, type IPostFilters } from "@/entities/posts";
import { routes } from "@/constants";
import { AddPostModal } from "@/widgets";
import { useDebounce, useTypedDispatch } from "@/hooks";

const filterOptions = [
  {
    value: "priority,asc",
    label: "Приоритету (asc)",
  },
  {
    value: "priority,desc",
    label: "Приоритету (desc)",
  },
  {
    value: "created_at,asc",
    label: "Дате (asc)",
  },
  {
    value: "created_at,desc",
    label: "Дате (desc)",
  },
];

const priorityIcons = {
  [EPostPriority.HIGH]: <CaretUpFilled />,
  [EPostPriority.NORMAL]: <></>,
  [EPostPriority.LOW]: <CaretDownFilled />,
};

const PostsPage = () => {
  const navigate = useNavigate();
  const { posts, getPosts, isLoading } = usePosts();
  const dispatch = useTypedDispatch();

  const [sortBy, setSortBy] = useState<string>(filterOptions.at(1)?.value || "");
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const [sortValue, sortMethod] = sortBy.split(",");
    getPosts({
      search: debouncedSearch,
      sortBy: sortValue as keyof IPost,
      sortMethod: sortMethod as IPostFilters["sortMethod"],
    });
  }, [debouncedSearch, sortBy]);

  const onCreatePost = async (newPost: IPost) => {
    dispatch(setPosts([...posts, newPost]));
  };

  return (
    <div className="container">
      <Flex wrap align="center" justify="space-between" gap={12}>
        <Typography.Title level={3}>Посты</Typography.Title>
        <Flex align="center" gap={16}>
          <Input
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 100, maxWidth: 250 }}
            placeholder="Поиск..."
          />
          <Select
            value={sortBy}
            onSelect={setSortBy}
            style={{ minWidth: 150 }}
            placeholder="Сортировать по"
            options={filterOptions}
          />
          <AddPostModal onCreate={onCreatePost} />
        </Flex>
      </Flex>
      <br />
      <List
        dataSource={posts}
        loading={isLoading}
        split
        renderItem={(post, index) => (
          <Card onClick={() => navigate(`${routes.posts}/${post.id}`)} style={{ marginTop: index !== 0 ? 12 : 0 }}>
            <Typography.Title level={4}>
              {post.title} {priorityIcons[post.priority]}
            </Typography.Title>
            <Typography>{post.description}</Typography>
            <Typography>Создано: {new Date(post.created_at).toLocaleDateString()}</Typography>
          </Card>
        )}
      />
    </div>
  );
};

export default PostsPage;
