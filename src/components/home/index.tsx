import React from "react";
import { useAuth } from "../../contexts/authContext";
import { User } from "firebase/auth"; // Importa el tipo User de firebase/auth

interface AuthContextType {
  user: User | null;
  userLoggedIn: boolean;
}

const Home: React.FC = () => {
  const auth = useAuth() as AuthContextType;
  const { user } = auth;

  return (
    <div className="text-2xl font-bold pt-14">
      Hello {user?.displayName ? user.displayName : user?.email}, you are now
      logged in.
    </div>
  );
};

export default Home;
