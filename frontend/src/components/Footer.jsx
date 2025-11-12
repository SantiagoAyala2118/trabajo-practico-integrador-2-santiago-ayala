export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/90 text-white border-t border-white/10 py-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-white/60 px-6">
        <p className="tracking-wide">
          © {year} Santiago Ayala — Todos los derechos reservados.
        </p>
        <p className="mt-2 sm:mt-0 text-white/50">Desarrollado con 💻 y ☕</p>
      </div>
    </footer>
  );
}
