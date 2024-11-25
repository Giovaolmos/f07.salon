import { Peluqueros } from "../../helpers/PeluquerosList";

const Home = () => {
  return (
    <div className="p-4 mt-16">
      <h1 className="text-4xl md:text-5xl text-amber-400 font-bold text-center mb-6">
        NUESTROS BARBEROS
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Peluqueros.map((peluquero, index) => (
          <div
            key={index}
            className="bg-yellow-900/10 rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {peluquero.name}
            </h3>
            <img
              src={peluquero.imagen}
              alt={peluquero.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />

            <p className="text-white">Precio: ${peluquero.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
