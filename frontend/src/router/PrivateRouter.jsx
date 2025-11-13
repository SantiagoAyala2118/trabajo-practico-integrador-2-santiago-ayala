import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

export const PrivateRouter = ({ onLogout }) => {
  const [authState, setAuthState] = useState({
    isAuth: false,
    loading: true,
  });

  const isLoggedFetch = async () => {
    setAuthState({
      ...authState,
      loading: true,
    });

    try {
      const isLogged = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!isLogged.ok) {
        return setAuthState({
          isAuth: false,
          loading: false,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuthState({
        isAuth: true,
        loading: false,
      });
    } catch (err) {
      console.log("Error consiguiendo las cookies del usuario");
      setAuthState({ isAuth: false, loading: false });
    }
  };

  useEffect(() => {
    isLoggedFetch();
  }, []);

  const { isAuth, loading } = authState;

  return (
    <div>
      {loading ? (
        <Loading />
      ) : isAuth ? (
        <>
          <Navbar onLogout={onLogout} onAuth={isAuth} />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
