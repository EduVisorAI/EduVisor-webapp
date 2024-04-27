import Header from "./components/header";
import Home from "./pages/home/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import "./App.module.css";
import { Layout } from "./pages/layout";
import { AIContextProvider } from "./contexts/ai-context";
import { ChatPage } from "./pages/chat/chat";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/chat/:chatId", element: <ChatPage /> }
    ]
  },
  {
    path: "/auth",
    element: <Header />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
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
