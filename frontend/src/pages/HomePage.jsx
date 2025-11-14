// src/pages/Home.jsx
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [userData, setUserData] = useState({
    name: null,
    lastname: null,
    loading: false,
  });

  //* ESTADO DE TAREAS
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  //* FETCH PARA CONSEGUIR LOS DATOS DEL USUARIO
  const getUserData = async () => {
    setUserData({
      ...userData,
      loading: true,
    });

    try {
      const userFetch = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!userFetch.ok) {
        console.log("Error en el fetch con los datos del usuario");
        setUserData({
          name: null,
          lastname: null,
          loading: false,
        });
      }

      const data = await userFetch.json();

      setUserData({
        name: data.user.name,
        lastname: data.user.lastname,
        loading: false,
      });

      console.log(data);
    } catch (err) {
      console.log("Error trayendo los datos del usuario");
    }
  };

  //* FETCH PARA CONSEGUIR LOS DATOS DE LAS TAREAS
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const tasksFetch = await fetch(
        "http://localhost:3000/api/tasks-by-user",
        {
          credentials: "include",
        }
      );

      if (!tasksFetch.ok) {
        setTasks([]);
        console.log("Error en las tasks");
        return;
      }

      const userTasks = await tasksFetch.json();
      setTasks(userTasks);

      //* ACÁ OBTENGO LAS TASKS COMPLETADAS
      const completed = userTasks.filter((task) => {
        return task.is_completed == true || task.is_completed == 1;
      });
      setTasksCompleted(completed);

      //* ACÁ OBTENGO LAS TAREAS PENDIENTES
      const incompleted = userTasks.filter((task) => {
        return task.is_completed == false || task.is_completed == 0;
      });
      setPendingTasks(incompleted);

      return tasks;
    } catch (err) {
      console.error("Error consiguiendo las tasks del usuario", err);
    }
  };

  useEffect(() => {
    getUserData();
    getTasks();
  }, []);

  const { name, lastname, loading } = userData;

  if (loading) {
    <Loading />;
  }

  return (
    <main className="min-h-[70vh] py-12 bg-black/90 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-8 flex flex-col md:flex-row items-start gap-6">
          {/* Texto de bienvenida */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-2">
              ¡Bienvenido,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#4f46e5] to-[#ff2d55]">
                {name} {lastname}
              </span>
              !
            </h2>
            <p className="text-sm text-white/70 max-w-lg">
              Acá podés ver un resumen rápido de tus tareas, navegar a Tasks y
              revisar tu perfil.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/tasks"
                className="inline-block py-2 px-4 rounded-lg bg-gradient-to-r from-[#0047ff]/60 to-[#ff355e]/60 hover:from-[#0047ff] hover:to-[#ff355e] transition shadow-sm font-medium"
              >
                Ir a Tasks
              </Link>

              <Link
                to="/profile"
                className="inline-block py-2 px-4 rounded-lg border border-white/10 text-white/90 hover:bg-white/5 transition font-medium"
              >
                Ver perfil
              </Link>
            </div>
          </div>

          {/* Imagen / resumen pequeño (opcional) */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-white/3 to-white/2 p-4 rounded-xl border border-white/6">
              <img src="../logo-sin-fondo-2.png" alt="Logotipo marca" />
            </div>
          </div>
        </section>

        {/* Cards estadísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#4f46e5]">
              {/* ícono simple */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
              >
                <path
                  d="M3 7h18M3 12h18M3 17h18"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/60">Total de tareas</p>
              <p className="text-2xl font-semibold">{tasks.length}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#10b981] to-[#06b6d4]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/60">Completadas</p>
              <p className="text-2xl font-semibold text-white/80">
                {tasksCompleted.length}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#ff2d55] to-[#ff7a7a]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
              >
                <path
                  d="M12 8v4l3 3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/60">Pendientes</p>
              <p className="text-2xl font-semibold text-white/80">
                {pendingTasks.length}
              </p>
            </div>
          </div>
        </section>

        {/* Sección de tarjetas (ejemplos) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-white/4 border border-white/8 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Tareas recientes</h3>
            <p className="text-sm text-white/70 mb-4">
              Estas son las últimas tareas que creaste
            </p>

            <ul className="space-y-3">
              {[...tasks].slice(-3).map((task) => {
                return (
                  <li
                    key={task.id}
                    className="flex items-center justify-between bg-white/3 p-3 rounded-md"
                  >
                    {task.title}
                  </li>
                );
              })}
            </ul>
          </article>

          <aside className="bg-white/4 border border-white/8 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Atajos</h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/create-task"
                className="block py-2 px-3 rounded-md bg-white/10 hover:bg-white/20"
              >
                Crear tarea
              </Link>
              <Link
                to="/tasks"
                className="block py-2 px-3 rounded-md bg-white/10 hover:bg-white/20"
              >
                Ver todas las tareas
              </Link>
              <Link
                to="/profile"
                className="block py-2 px-3 rounded-md bg-white/10 hover:bg-white/20"
              >
                Editar perfil
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};
