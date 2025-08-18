import { routes } from "@/constants";
import { useTypedSelector } from "@/hooks";
import { Layout, Menu } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const { role } = useTypedSelector((s) => s.users);

  const links = useMemo(() => {
    const publicRoutes = [
      {
        key: routes.home,
        label: "Главная",
        onClick: () => navigate(routes.home),
      },
      {
        key: routes.posts,
        label: "Посты",
        onClick: () => navigate(routes.posts),
      },
    ] as ItemType<MenuItemType>[];

    if (role?.name === "admin") {
      publicRoutes.push({
        key: routes.users,
        label: "Пользователи",
        onClick: () => navigate(routes.users),
      });
    }

    return !!role ? publicRoutes : [];
  }, [role]);

  return (
    <Layout.Header style={{ display: "flex", alignItems: "center" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} items={links} style={{ flex: 1, minWidth: 0 }} />
    </Layout.Header>
  );
};

export default Header;
