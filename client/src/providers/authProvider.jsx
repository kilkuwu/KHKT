import { useContext, createContext, useEffect, useState } from "react";
import Loading from "components/Loading";

const AuthContext = createContext({
  user: null,
  token: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  const [fetchUserFinished, setFetchUserFinished] = useState(false);

  useEffect(() => {
    async function fetchUserFromToken(accessToken) {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      const { user, token } = await response.json();

      if (!token) {
        return {
          user: null,
          token: null,
        };
      }

      return {
        user,
        token,
      };
    }

    const accessToken = localStorage.getItem("pamonitor-accessToken");

    if (!accessToken) {
      setAuth({
        user: null,
        token: null,
      });
      setFetchUserFinished(true);
    } else {
      fetchUserFromToken(accessToken).then((data) => {
        setAuth(data);
        setFetchUserFinished(true);
      });
    }
  }, []);

  if (!fetchUserFinished) return <Loading title={"Loading user..."} />;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}
