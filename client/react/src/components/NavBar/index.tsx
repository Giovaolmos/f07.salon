export const NavBar: React.FC = () => {
  return (
    <div>
      <header>
        <nav className="flex items-center p-4">
          <img className="rounded-full size-12" src="logo.jpeg" alt="logo" />
          <div className="ml-auto">
            <ul className="flex gap-4 items-center cursor-pointer">
              <li>Inicio</li>
              <li>Historial </li>
              <li>Nuevo Turno</li>
              <li>Home</li>
              <li className="rounded-md bg-teal-600  px-4 py-2 text-white transition hover:bg-teal-500">
                Iniciar Sesión
              </li>
              <li className="rounded-md px-4 py-2 text-white bg-sky-500/80 hover:bg-sky-400/80">
                Registrar
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};
