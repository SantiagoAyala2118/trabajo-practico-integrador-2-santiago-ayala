import { Navigate, Outlet } from "react-router";

export const PrivateRouter = () => {
  const isLogged = localStorage.getItem("isLogged");

  return <div>{isLogged ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};
