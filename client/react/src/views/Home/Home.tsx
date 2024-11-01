import { Peluqueros } from "../../helpers/PeluquerosList";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 sm:p-8"
      style={{ backgroundImage: `url('/bgimage.jpg')` }}
    >
      <h1 className="text-5xl text-[#d0aa7f] font-bebas text-center mb-6 sm:mb-8">
        ¡Bienvenido a F07 SALON!
      </h1>
      <h2 className="text-center text-[#BC8F5A] mb-10 mt-24">
        NUESTROS BARBEROS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {Peluqueros.map((peluquero, index) => (
          <div
            key={index}
            className="bg-[#997458ab] shadow-md rounded-lg p-6 w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-200"
          >
            <img
              className="rounded-full mx-auto mb-4 w-36 h-36 object-cover"
              src={`/${peluquero.img}`}
              alt={peluquero.name}
            />
            <h2 className="text-xl font-semibold text-[#f6e7d6]">
              {peluquero.name}
            </h2>
            <p className="text-white">Precio: ${peluquero.price}</p>
            <button className="bg-[#BC8F5A] rounded-md py-1 px-2 text-white hover:bg-[#FFDA77] mt-4">
              Sacar Turno
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
