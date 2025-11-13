import { useNavigate } from "react-router";
import { AppRouter } from "./router/AppRouter";

function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutFetch = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!logoutFetch.ok) {
        console.log("Error al desloguearse");
      }

      navigate("/login");
    } catch (err) {
      return console.log("Error durante el logout", err);
    }
  };

  return <AppRouter onLogout={handleLogout} />;
}

export default App;
