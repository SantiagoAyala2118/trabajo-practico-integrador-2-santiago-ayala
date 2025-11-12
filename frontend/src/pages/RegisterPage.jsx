import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const { formState, handleChange, handleSubmit } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const registerFetch = async () => {
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

      const data = await res.json();

      alert("Registro exitoso", JSON.parse(data));

      navigate("/login");
    } catch (err) {
      return console.log("Error haciendo el fetch", err);
    }
  };

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

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

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
