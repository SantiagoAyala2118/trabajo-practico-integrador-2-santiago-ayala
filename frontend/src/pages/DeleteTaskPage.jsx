import { useEffect, useState } from "react";
import { Link } from "react-router";

export const DeleteTaskPage = () => {
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

      console.log(userTasks);
    } catch (err) {
      console.log("Error consiguiendo las tasks", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task) => {
            return (
              <li
                key={task.id}
                className="flex items-center justify-between bg-white/3 p-3 rounded-md hover:bg-white/5 transition"
              >
                <div className="text-sm text-black/90 ">
                  {task.title ?? "Sin título"}
                </div>
                <div>
                  {String(task.is_completed) === true
                    ? "Completada"
                    : "Pendiente"}
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
    </div>
  );
};
