import { Navigate, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { Footer } from "../components/Footer";

export const PublicRouter = () => {
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

      setAuthState({
        isAuth: true,
        loading: false,
      });
    } catch (err) {
      console.log("Error consiguiendo las cookies del usuario");
      setAuthState({
        isAuth: false,
        loading: false,
      });
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
      ) : !isAuth ? (
        <>
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
};
