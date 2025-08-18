import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MyLayout = () => {
  return (
    <Layout.Content>
      <Header />
      <br />
      <Outlet />
    </Layout.Content>
  );
};

export default MyLayout;
