import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/authService";
import { getToken } from "../utils/localStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {

      const token = getToken();

      if (!token) {

        setLoading(false);

        return;

      }

      try {

        const response = await getProfile();

        setUser(response.user);

      } catch (error) {

        console.error(error);

        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    loadUser();

  }, []);

  const login = (userData) => {

    setUser(userData);

  };

  const logout = () => {

    setUser(null);

  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {

  return useContext(AuthContext);

}