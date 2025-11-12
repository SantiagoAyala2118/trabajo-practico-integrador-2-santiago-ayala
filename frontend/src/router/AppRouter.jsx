import { Route, Routes } from "react-router";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { RegisterPage } from "../pages/RegisterPage";
import { Login } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="*" element={<RegisterPage />} />
        </Route>

        <Route>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
