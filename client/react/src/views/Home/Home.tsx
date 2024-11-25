import { Peluqueros } from "../../helpers/PeluquerosList";

const Home = () => {
  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl font-bold text-center mb-6">Nuestros barberos</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Peluqueros.map((peluquero, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={peluquero.imagen}
              alt={peluquero.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {peluquero.name}
            </h3>
            <p className="text-gray-600">Precio: {peluquero.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
