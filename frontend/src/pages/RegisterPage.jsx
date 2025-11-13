import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { Loading } from "../components/Loading";

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { formState, handleChange, handleSubmit } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    dni: "",
  });

  const navigate = useNavigate();

  const registerFetch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        return console.log(
          "Error en el fetch de registro",
          res.status,
          res.statusText
        );
      }
      console.log("registro exitoso");
      console.log(formState);
      setIsLoading(false);

      navigate("/login");
    } catch (err) {
      console.log("Error haciendo el fetch", err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">
          Crear cuenta
        </h2>

        <form
          className="space-y-5"
          onSubmit={(e) => (registerFetch(), handleSubmit(e))}
        >
          {/* Nombre */}
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block mb-1 text-sm font-medium">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formState.lastname}
              onChange={handleChange}
              placeholder="Tu apellido"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Usuario */}
          <div>
            <label className="block mb-1 text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="tuemail@ejemplo.com"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Contraseña y DNI en la misma fila */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            {/* Contraseña */}
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* DNI */}
            <div className="flex-1 mt-5 sm:mt-0">
              <label className="block mb-1 text-sm font-medium">DNI</label>
              <input
                type="number"
                name="dni"
                value={formState.dni}
                onChange={handleChange}
                placeholder="12345678"
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-2 bg-white/20 hover:bg-white/30 transition rounded-lg mt-4 font-medium"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-white/60">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-white hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
