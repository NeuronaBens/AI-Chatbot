"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const StudentPsicometrics = ({ refreshPsicometrics }) => {
  const { data: session, status } = useSession();
  const [anxietyLevels, setAnxietyLevels] = useState([]);
  const [stressLevels, setStressLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const userId = session.user.id;
        const anxietyResponse = await fetch(
          `/api/database/students/${userId}/psicometrics/anxiety`
        );
        const anxietyData = await anxietyResponse.json();
        setAnxietyLevels(anxietyData);

        const stressResponse = await fetch(
          `/api/database/students/${userId}/psicometrics/stress`
        );
        const stressData = await stressResponse.json();
        setStressLevels(stressData);
      }
    };
    fetchData();
  }, [session, status, refreshPsicometrics]);

  return (
    <div className="w-5/6 mx-auto justify-center items-center mt-4">
      <br></br>
      <hr className="m-5"></hr>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Niveles de Ansiedad
      </h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        {anxietyLevels.map((level, index) => (
          <div
            key={level.id}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">
                {index + 1}
              </h1>
            </div>
            <div className="order-1 bg-gradient-to-r from-[#3A378C] to-[#6C63FF] rounded-lg shadow-xl w-5/12 px-6 py-4 text-white">
              {level.anxiety >= 0 && level.anxiety < 5 && (
                <h3 className="mb-3 font-bold text-xl">
                  No se aprecia ansiedad
                </h3>
              )}
              {level.anxiety >= 5 && level.anxiety < 10 && (
                <h3 className="mb-3 font-bold text-xl">Ansiedad Leve</h3>
              )}
              {level.anxiety >= 10 && level.anxiety < 15 && (
                <h3 className="mb-3 font-bold text-xl">Ansiedad Moderada</h3>
              )}
              {level.anxiety >= 15 && level.anxiety < 22 && (
                <h3 className="mb-3 font-bold text-xl">Ansiedad Severa</h3>
              )}
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Nivel de Ansiedad: {level.anxiety}
              </p>
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Fecha: {new Date(level.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-12 text-center">
        Niveles de Estrés
      </h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        {stressLevels.map((level, index) => (
          <div
            key={level.id}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto text-white font-semibold text-lg">
                {index + 1}
              </h1>
            </div>
            <div className="order-1 bg-gradient-to-r from-[#3A378C] to-[#6C63FF] rounded-lg shadow-xl w-5/12 px-6 py-4 text-white">
              {level.stress >= 0 && level.stress < 15 && (
                <h3 className="mb-3 font-bold text-xl">
                  Casi nunca o nunca está estresado
                </h3>
              )}
              {level.stress >= 15 && level.stress < 29 && (
                <h3 className="mb-3 font-bold text-xl">
                  De vez en cuando está estresado
                </h3>
              )}
              {level.stress >= 29 && level.stress < 43 && (
                <h3 className="mb-3 font-bold text-xl">
                  A menudo está estresado
                </h3>
              )}
              {level.stress >= 43 && level.stress < 57 && (
                <h3 className="mb-3 font-bold text-xl">
                  Muy a menudo está estresado
                </h3>
              )}
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Nivel de estrés: {level.stress}
              </p>
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Fecha: {new Date(level.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-72"></div>
    </div>
  );
};

export default StudentPsicometrics;
