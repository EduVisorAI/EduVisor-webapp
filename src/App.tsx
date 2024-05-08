import Home from "./pages/home/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import "./App.module.css";
import { Layout } from "./pages/layout";
import { AIContextProvider } from "./contexts/ai-context";
import { ChatPage } from "./pages/chat/chat";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import PrivateRoute from "./pages/private_route";
import { DisplayPage } from "./pages/display/display";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: "/chat/:chatId",
        element: (
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "/display/:chatId",
        element: <DisplayPage />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <AIContextProvider>
        <RouterProvider router={router} />
      </AIContextProvider>
    </AuthProvider>
  );
}

export default App;
