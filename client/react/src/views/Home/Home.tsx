import { useEffect, useState } from "react";
import { getAllHairdressers } from "../../helpers/hairdressers/getAllHairdressers";
import { IHairdresser } from "../../interfaces/Hairdresser/Hairdresser";
import { Link } from "react-router-dom";

const Home = () => {
  const [hairdressers, setHairdressers] = useState<IHairdresser[]>([]);
  useEffect(() => {
    const fetchHairdressers = async () => {
      const hairdressersDB = await getAllHairdressers();
      setHairdressers(hairdressersDB);
    };
    fetchHairdressers();
  }, []);
  return (
    <div className="p-4 mt-16">
      <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        NUESTROS BARBEROS
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hairdressers.map((hairdresser) => (
          <div
            key={hairdresser.id}
            className="bg-yellow-800/60  rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {hairdresser.name}
            </h3>
            <img
              src={hairdresser.img}
              alt={hairdresser.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="text-white">Precio: ${hairdresser.price}</p>
            <Link
              to="/reservar-turno"
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
            >
              Sacar Turno
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
