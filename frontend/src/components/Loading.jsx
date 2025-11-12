export const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

        {/* Texto */}
        <h1 className="text-xl font-medium tracking-wider text-white/80 animate-pulse">
          Cargando...
        </h1>
      </div>
    </div>
  );
};
