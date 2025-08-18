import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/Auth/AuthPage";
import PostsPage from "./pages/PostsPage";

import { AuthProvider } from "./providers";
import { store } from "./store";
import { Layout } from "./components";
import GetDataProvider from "./providers/GetDataProvider";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <AuthProvider>
                <GetDataProvider>
                  <Layout />
                </GetDataProvider>
              </AuthProvider>
            </Provider>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth"} element={<AuthPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/posts"} element={<PostsPage />} />
          <Route path={"/posts/:id"} element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
