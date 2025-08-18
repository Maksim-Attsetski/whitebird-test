import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider, router } from "./providers";
import { RouterProvider } from "react-router";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
