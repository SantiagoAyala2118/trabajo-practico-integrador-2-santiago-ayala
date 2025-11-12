import { NavLink } from "react-router";

export const Navbar = ({ onLogout }) => {
  return (
    <header className="w-full bg-black/90 text-white shadow-md backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Título */}
        <h1 className="text-xl font-semibold tracking-wide text-white/80">
          Bienvenido
        </h1>

        {/* Enlaces */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/tasks"
            className="text-white/70 hover:text-white transition tracking-wide"
          >
            Tasks
          </NavLink>

          <button
            onClick={onLogout}
            className="text-white/70 hover:text-white transition tracking-wide"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
