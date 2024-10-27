import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/landingvideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white text-center bg-black bg-opacity-50 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Bienvenido a F07 Salon
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Descubre nuestros servicios
        </p>
        <button className="px-6 py-3 text-lg font-semibold bg-white text-black rounded-md hover:bg-gray-200 transition duration-300">
          ¡Quiero mi turno!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;