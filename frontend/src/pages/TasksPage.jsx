import { useEffect, useState } from "react";
import { Link } from "react-router";

export const TasksPage = () => {
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

      return tasks;
    } catch (err) {
      console.error("Error consiguiendo las tasks del usuario", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="min-h-[82vh] py-12 bg-black/90 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero pequeño */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg mb-8 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-1">
              Tus tareas
            </h2>
            <p className="text-sm text-white/70 max-w-lg">
              Este es el listado de todas tus tareas pendientes y completadas
            </p>
          </div>

          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-white/3 to-white/2 p-3 rounded-xl border border-white/6">
              <p className="text-xs text-white/60 mb-1">Resumen</p>
              <div className="text-sm text-white/80">
                Total: {tasks?.length ?? 0}
              </div>
            </div>
          </div>
        </section>

        {/* Card principal con listado */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <article className="md:col-span-2 bg-white/4 border border-white/8 rounded-2xl p-5 shadow-md">
            <h3 className="text-lg font-semibold mb-3">Todas las tareas</h3>

            {tasks.length > 0 ? (
              <ul className="space-y-3">
                {tasks.map((task) => {
                  return (
                    <li
                      key={task.id}
                      className="flex items-center justify-between bg-white/3 p-3 rounded-md hover:bg-white/5 transition"
                    >
                      <div className="text-sm text-white/90 truncate">
                        {task.title ?? "Sin título"}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-6 text-center text-white/60">
                Parece que no tenés tareas por ahora 💤
              </div>
            )}
          </article>

          {/* Aside / atajos (estilo Home) */}
          <aside className="bg-white/4 border border-white/8 rounded-2xl p-5 shadow-md">
            <h4 className="text-sm font-semibold mb-3">Atajos</h4>
            <div className="flex flex-col gap-3">
              <Link
                to={"/create-task"}
                className="w-full text-left py-2 px-3 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                Crear tarea
              </Link>
              <Link
                to={"/update-task"}
                className="w-full text-left py-2 px-3 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                Actualizar una tarea
              </Link>
              <Link
                to={"/delete-task"}
                className="w-full text-left py-2 px-3 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                Eliminar una tarea
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};
