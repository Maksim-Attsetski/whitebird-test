import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/Auth/AuthPage";
import { AuthProvider } from "./providers";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <AuthProvider />
            </Provider>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth"} element={<AuthPage />} />
          <Route path={"/about"} element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
