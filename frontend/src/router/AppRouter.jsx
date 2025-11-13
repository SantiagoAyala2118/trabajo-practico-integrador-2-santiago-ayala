import { Route, Routes } from "react-router";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { RegisterPage } from "../pages/RegisterPage";
import { Login } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TasksPage } from "../pages/TasksPage";

export const AppRouter = ({ onLogout }) => {
  return (
    <>
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Route>

        <Route element={<PrivateRouter onLogout={onLogout} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/user-tasks" element={<TasksPage />} />
          {/* <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/delete-task" element={<DeleteTaskPage />} />
          <Route path="/update-task" element={<UpdateTaskPage />} /> */}
          <Route path="/" element={"/home"} />
          <Route path="*" element={"/home"} />
        </Route>
      </Routes>
    </>
  );
};
