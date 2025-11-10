export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">
          Iniciar sesión
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg placeholder-white/40 focus:outline-none focus:border-white transition"
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
          <a href="/register" className="text-white hover:underline">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
};
