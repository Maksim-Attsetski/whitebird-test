import { useNavigate } from "react-router-dom";
import { Card, List, Typography } from "antd";

import { usePosts } from "@/entities/posts/hooks";
import { useEffect } from "react";
import { routes } from "@/constants";

const PostsPage = () => {
  const navigate = useNavigate();
  const { posts, getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <List
        dataSource={posts}
        split
        renderItem={(post, index) => (
          <Card onClick={() => navigate(`${routes.posts}/${post.id}`)} style={{ marginTop: index !== 0 ? 12 : 0 }}>
            <Typography.Title level={4}>{post.title}</Typography.Title>
            <Typography>{post.description}</Typography>
            <Typography>Создано: {new Date(post.created_at).toLocaleDateString()}</Typography>
          </Card>
        )}
      />
    </div>
  );
};

export default PostsPage;
