import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  userLoggedIn: boolean;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth() as AuthContextType;
  const { userLoggedIn } = auth;

  if (!userLoggedIn) return <Navigate to="/login" />;

  return children;
}

export default PrivateRoute;
