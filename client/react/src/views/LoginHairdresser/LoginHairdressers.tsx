const LoginHairdresser = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center w-full">
      <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/80 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          INICIO DE SESIÓN BARBEROS
        </h1>

        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginHairdresser;
