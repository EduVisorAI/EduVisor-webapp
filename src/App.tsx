import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function Routes() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  const routesElement = useRoutes(routesArray);
  return <div className="w-full h-screen flex flex-col">{routesElement}</div>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
