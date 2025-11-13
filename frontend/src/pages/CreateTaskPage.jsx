import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateTaskPage = () => {
  const { formState, handleChange, handleSubmit } = useForm({
    title: "",
    description: "",
    is_completed: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createTaskFetch = async () => {
    try {
      setLoading(true);

      const newTask = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (!newTask.ok) {
        console.log("No se pudo crear la tarea");
        setLoading(false);
        return;
      }

      const data = await newTask.json();
      console.log(data);

      navigate("/tasks");
      setLoading(false);
    } catch (err) {
      console.log("Error creando la tarea en el fetch", err);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <main className="min-h-[70vh] py-12 bg-black/90 text-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Encabezado */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-8">
          <h1 className="text-3xl font-semibold mb-2">Crear nueva tarea</h1>
          <p className="text-white/70 text-sm max-w-lg">
            Completá el formulario para agregar una nueva tarea a tu lista.
          </p>
        </section>

        {/* Formulario */}
        <section className="bg-white/4 border border-white/8 rounded-2xl p-6 shadow-md">
          <form
            onSubmit={(e) => (handleSubmit(e), createTaskFetch())}
            className="flex flex-col gap-5 text-white/90"
          >
            {/* Campo título */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm text-white/70 mb-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Ej: Estudiar para el parcial"
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 placeholder:text-white/50"
              />
            </div>

            {/* Campo descripción */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm text-white/70 mb-1"
              >
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Agregá una breve descripción de la tarea"
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 placeholder:text-white/50 resize-none h-24"
              ></textarea>
            </div>

            {/* Campo completada */}
            <div className="flex flex-col">
              <label
                htmlFor="is_completed"
                className="text-sm text-white/70 mb-1"
              >
                ¿Está completada?
              </label>
              <select
                name="is_completed"
                id="is_completed"
                value={formState.is_completed}
                onChange={handleChange}
                className="bg-[#1e1e1e] border border-white/20 rounded-lg px-4 py-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/40 appearance-none"
              >
                <option value="" className="bg-[#1e1e1e] text-white/80">
                  Seleccioná una opción
                </option>
                <option value="true" className="bg-[#1e1e1e] text-white/80">
                  Sí
                </option>
                <option value="false" className="bg-[#1e1e1e] text-white/80">
                  No
                </option>
              </select>
            </div>

            {/* Botón de enviar */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="py-2 px-5 rounded-lg bg-gradient-to-r from-[#0047ff]/60 to-[#ff355e]/60 hover:from-[#0047ff] hover:to-[#ff355e] hover:cursor-pointer transition shadow-sm font-medium"
              >
                Crear tarea
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
