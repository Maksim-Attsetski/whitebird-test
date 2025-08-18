import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./providers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProvider />}>
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth"} element={<AuthPage />} />
          <Route path={"/about"} element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
