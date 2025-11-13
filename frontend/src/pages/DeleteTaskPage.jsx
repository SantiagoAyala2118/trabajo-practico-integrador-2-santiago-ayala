import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const DeleteTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);

    try {
      const tasksFetch = await fetch(
        "http://localhost:3000/api/tasks-by-user",
        {
          credentials: "include",
        }
      );

      if (!tasksFetch.ok) {
        setTasks([]);
        setIsLoading(false);
        console.log("Error en las tasks");
        return;
      }

      const userTasks = await tasksFetch.json();
      setTasks(userTasks);
      setIsLoading(false);
    } catch (err) {
      console.log("Error consiguiendo las tasks", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const deleteTask = await fetch(
        `http://localhost:3000/api/tasks/${selectedTask.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!deleteTask.ok) {
        console.log("No se ha podido eliminar la task", deleteTask.statusText);
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSelectedTask(null);

      getTasks();

      setIsLoading(false);
    } catch (err) {
      console.log("Error eliminando la tarea");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black/90 text-white p-6">
      {/* LISTA DE TAREAS */}
      {tasks.length > 0 ? (
        <ul className="space-y-3 max-w-xl mx-auto">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="flex items-center justify-between bg-white/5 border border-white/10 
              p-4 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <div className="text-sm text-white/90 font-medium">
                {task.title ?? "Sin título"}
              </div>

              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  task.is_completed == true || task.is_completed == 1
                    ? "bg-green-600/30 text-green-400"
                    : "bg-red-600/30 text-red-400"
                }`}
              >
                {task.is_completed == true || task.is_completed == 1
                  ? "Completada"
                  : "Pendiente"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-6 text-center text-white/60">
          Parece que no tenés tareas por ahora 💤
        </div>
      )}

      {/* MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-sm 
            shadow-xl animate-fadeIn"
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              {selectedTask.title}
            </h2>

            <p className="text-white/70 text-sm mb-6">
              ¿Estás seguro que querés eliminar esta tarea? Esta acción no se
              puede deshacer.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-lg border border-white/20 
                text-white/80 hover:bg-white/10 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600/70 hover:bg-red-600 
                text-white font-medium transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
