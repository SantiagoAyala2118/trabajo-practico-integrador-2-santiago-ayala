import { Navigate, Outlet } from "react-router";

export const PublicRouter = () => {
  const isLogged = localStorage.getItem("isLogged");

  return <div>{!isLogged ? <Outlet /> : <Navigate to={"/home"} />}</div>;
};
