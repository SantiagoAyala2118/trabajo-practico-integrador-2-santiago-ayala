export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-t flex flex-col items-center text-center border-zinc-800 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-center sm:text-left">
          &copy; {year}{" "}
          <span className="text-white font-medium hover:text-blue-500 transition">
            Santiago Tomás Ayala
          </span>
        </p>

        <p className="text-xs text-zinc-500 tracking-wide">
          Desarrollado con 💻 y ☕
        </p>
      </div>
    </footer>
  );
};
