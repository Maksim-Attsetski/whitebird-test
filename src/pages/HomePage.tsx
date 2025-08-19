import { routes, supabase } from "@/constants";
import { setRole, setUser } from "@/entities/users";
import { useTypedDispatch, useTypedSelector } from "@/hooks";
import { Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, role } = useTypedSelector((s) => s.users);
  const dispatch = useTypedDispatch();

  // убрать в хук, если еще где-то пригодится
  const onClickLogout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    dispatch(setRole(null));
    navigate(routes.auth);
  };

  return (
    <div className="container">
      {user ? (
        <>
          <Typography.Title level={2}>Добро пожаловать</Typography.Title>
          <Typography.Title level={5}>{user?.email}</Typography.Title>
          <Typography.Title level={5}>Роль - {role?.name}</Typography.Title>
        </>
      ) : (
        <>
          <Typography>Авторизуйтесь</Typography>
          <Link to={routes.auth}>Перейти</Link>
        </>
      )}
      <br />
      <Typography.Paragraph>Здесь я решил использовать готовую СУБД - Supabase</Typography.Paragraph>
      <Typography.Paragraph>Я реализовал базовый функционал на React</Typography.Paragraph>

      {user && (
        <Button danger onClick={onClickLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default HomePage;
