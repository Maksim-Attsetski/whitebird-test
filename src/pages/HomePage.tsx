import { routes } from "@/constants";
import { useTypedSelector } from "@/hooks";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useTypedSelector((s) => s.users);

  return (
    <div>
      {user ? (
        <>
          <Typography>{user?.email}</Typography>
          <Typography>{JSON.stringify(user?.user_metadata)}</Typography>
        </>
      ) : (
        <>
          <Typography>Авторизуйтесь</Typography>
          <Link to={routes.auth}>Перейти</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
