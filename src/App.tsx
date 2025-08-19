import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/Auth/AuthPage";
import PostsPage from "./pages/PostsPage";

import { RootProvider } from "./providers";
import PostDetailsPage from "./pages/PostDetailsPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootProvider />}>
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth"} element={<AuthPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/users"} element={<UsersPage />} />
          <Route path={"/posts"} element={<PostsPage />} />
          <Route path={"/posts/:id"} element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
