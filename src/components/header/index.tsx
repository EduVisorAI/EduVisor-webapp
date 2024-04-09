import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { User } from "firebase/auth"; // Importa el tipo User de firebase/auth

interface AuthContextType {
  user: User | null;
  userLoggedIn: boolean;
  // Agrega aquí cualquier otro valor que estés pasando en tu contexto
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth() as AuthContextType; // Asegúrate de que useAuth() devuelve un objeto de tipo AuthContextType
  const { userLoggedIn } = auth;

  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
      {userLoggedIn ? (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="text-sm text-blue-600 underline" to={"/login"}>
            Login
          </Link>
          <Link className="text-sm text-blue-600 underline" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
