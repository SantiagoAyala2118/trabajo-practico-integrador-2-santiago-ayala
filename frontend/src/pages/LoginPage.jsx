import { useForm } from "../hooks/useForm.js";
import { Link, useNavigate } from "react-router";

export const Login = () => {
  const { formState, handleSubmit, handleChange } = useForm({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginFetch = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        return console.log(
          "No se ha podido loguear",
          res.status,
          res.statusText
        );
      }

      alert("Login exitoso");

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/home");
    } catch (err) {
      console.error("Error durante el login", err);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">
          Iniciar sesión
        </h2>

        <form
          className="space-y-5"
          onSubmit={(e) => (handleSubmit(e), loginFetch())}
        >
          <div>
            <label className="block mb-1 text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              placeholder="********"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-white/20 hover:bg-white/30 transition rounded-lg mt-4 font-medium"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-white/60">
          ¿No tenés una cuenta?{" "}
          <Link to="/register" className="text-white hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};
