import React from "react";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="items-center mt-48 bg-gray-900">
        <div className="h-10 bg-gradient-to-b from-white via-gray-500 to-gray-900"></div>
        <div className="px-8 py-4">
          <p className="mb-4 mt-4">
            Esta página se editó por última vez el 23 may 2023 a las 01:00.
          </p>
          <p className="mb-4">
            El texto está disponible bajo la Licencia Creative Commons
            Atribución Compartir Igual 4.0; pueden aplicarse cláusulas
            adicionales. Al usar este sitio, usted acepta nuestros términos de
            uso y nuestra política de privacidad.
          </p>
        </div>
        <div className="px-8 py-4">
          <ul className="flex flex-wrap space-x-4 sm:space-x-8 md:space-x-12">
            <li>
              <a
                href="/general/legal/politica-de-privacidad"
                className="underline text-orange-500"
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                href="/general/legal/terminos-y-condiciones"
                className="underline text-orange-500"
              >
                Términos de uso
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Limitación de responsabilidad
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Código de conducta
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Versión para móviles
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Desarrolladores
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Estadísticas
              </a>
            </li>
            <li>
              <a href="#" className="underline text-orange-500">
                Declaración de cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
