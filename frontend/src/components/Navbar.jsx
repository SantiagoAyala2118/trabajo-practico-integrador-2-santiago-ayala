import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";

export const Navbar = ({ onAuth = false, onLogout }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    // si ya estamos en /home, no hacer nada
    if (location.pathname === "/home") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  return (
    <header className="w-full bg-black/90 text-white shadow-md backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* Logo / título */}
        <div className="flex items-center gap-3">
          <button
            aria-label="menu"
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition"
            onClick={() => setOpen((open) => !open)}
          >
            {/* simple hamburger */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1
            className="text-lg font-semibold tracking-wide text-white/90 cursor-pointer"
            onClick={() => {
              // ir a home si no estamos
              if (location.pathname !== "/home") navigate("/home");
            }}
          >
            Bienvenido
          </h1>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6">
          {onAuth ? (
            <>
              <NavLink
                to="/home"
                onClick={handleHomeClick}
                className={({ isActive }) =>
                  `tracking-wide transition ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `tracking-wide transition ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                Tasks
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `tracking-wide transition ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                onClick={onLogout}
                to="/profile"
                className={({ isActive }) =>
                  `tracking-wide transition ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `py-1 px-3 rounded-md tracking-wide transition ${
                    isActive ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="py-1 px-3 rounded-md bg-white/20 hover:bg-white/30 transition font-medium"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu (slide down) */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full z-40 bg-black/95 border-t border-white/5 transform transition-all ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          } `}
        >
          <div className="flex flex-col gap-2 p-4">
            {onAuth ? (
              <>
                <NavLink
                  to="/home"
                  onClick={(e) => {
                    handleHomeClick(e);
                  }}
                  className="block py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/user-tasks"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Tasks
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="text-left py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded-md text-white/80 hover:bg-white/5"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
