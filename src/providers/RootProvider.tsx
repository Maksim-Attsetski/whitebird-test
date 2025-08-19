import type { FC } from "react";
import { Provider } from "react-redux";

import { Layout } from "@/components";
import { store } from "@/store";

import { AuthProvider } from "./AuthProvider";
import GetDataProvider from "./GetDataProvider";

const RootProvider: FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GetDataProvider>
          <Layout />
        </GetDataProvider>
      </AuthProvider>
    </Provider>
  );
};

export default RootProvider;
