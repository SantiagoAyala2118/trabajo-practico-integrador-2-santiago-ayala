import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const UpdateTaskPage = () => {
  const { formState, handleChange, handleSubmit, setFormState } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  //* FUNCIÓN PARA TRAER LAS TAREAS DEL USUARIO LOGUEADO
  const getTasks = async () => {
    setLoading(true);

    try {
      const tasksFetch = await fetch(
        "http://localhost:3000/api/tasks-by-user",
        {
          credentials: "include",
        }
      );

      if (!tasksFetch.ok) {
        setTasks([]);
        setLoading(false);
        console.log("Error en las tasks");
        return;
      }

      const userTasks = await tasksFetch.json();
      setTasks(userTasks);
      setLoading(false);
    } catch (err) {
      console.log("Error consiguiendo las tasks", err);
    } finally {
      setLoading(false);
    }
  };

  //* FUNCIÓN PARA ACTUALIZAR UNA TAREA
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const updateTask = await fetch(
        `http://localhost:3000/api/tasks/${selectedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formState),
        }
      );

      if (!updateTask.ok) {
        console.log(
          "No se pudo actualizar la tarea",
          updateTask.statusText,
          updateTask.status
        );
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSelectedTask(null);

      getTasks();

      setLoading(false);
    } catch (err) {
      console.log("Error actualizando una tarea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <>
      <div className="min-h-screen bg-black/90 text-white p-6">
        {/* LISTA DE TAREAS */}
        {tasks.length > 0 ? (
          <ul className="space-y-3 max-w-xl mx-auto">
            {tasks.map((task) => (
              <li
                key={task.id}
                onClick={() => (
                  setSelectedTask(task),
                  setFormState({
                    title: task.title,
                    description: task.description,
                    is_completed:
                      task.is_completed == true || task.is_completed == 1
                        ? "true"
                        : "false",
                  })
                )}
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
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-task-title"
          >
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h2
                id="edit-task-title"
                className="text-xl font-semibold text-white mb-1"
              >
                Editar tarea
              </h2>

              <p className="text-sm text-white/70 mb-4 truncate">
                {selectedTask.title}
              </p>

              <form
                onSubmit={(e) => (handleUpdate(), handleSubmit(e))}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-sm text-white/70 mb-1">
                    Título
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    placeholder="Ej: Estudiar para el parcial"
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/40 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-sm text-white/70 mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    placeholder="Agregá una breve descripción"
                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Campo completada */}
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    checked={formState.is_completed}
                    onChange={handleChange}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="is_completed"
                    className="text-sm text-white/80 cursor-pointer select-none"
                  >
                    ¿Está completada?
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0047ff]/60 to-[#ff355e]/60 hover:from-[#0047ff] hover:to-[#ff355e] text-white font-medium transition"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
