import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleUserData = async () => {
    setLoading(true);

    try {
      const getData = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!getData.ok) {
        console.log("No se pudo traer los datos del usuario");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      const userData = await getData.json();
      setData(userData);
    } catch (err) {
      console.log("Error trayendo los datos del usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  if (loading) return <Loading />;

  const handleLogout = async () => {
    const logout = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!logout.ok) {
      console.log("Error deslogueandose");
      return;
    }

    navigate("/login");
  };

  return (
    <main className="min-h-[70vh] py-12 bg-black/90 text-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Card principal */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-semibold mb-3">
            Perfil de{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#4f46e5] to-[#ff2d55]">
              {data.user.name} {data.user.lastname}
            </span>
          </h1>

          <p className="text-white/70 mb-8">
            Acá podés ver tu información básica como usuario registrado.
          </p>

          {/* Datos del usuario */}
          <div className="space-y-6">
            <div className="bg-white/4 border border-white/10 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-white/60">Nombre</p>
              <p className="text-lg font-semibold">{data.user.name}</p>
            </div>

            <div className="bg-white/4 border border-white/10 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-white/60">Apellido</p>
              <p className="text-lg font-semibold">{data.user.lastname}</p>
            </div>
          </div>

          {/* Boton logout */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full py-2.5 rounded-lg bg-gradient-to-r from-[#0047ff]/60 to-[#ff355e]/60 
            hover:from-[#0047ff] hover:to-[#ff355e] transition font-medium shadow-md"
          >
            Cerrar sesión
          </button>
        </section>
      </div>
    </main>
  );
};
