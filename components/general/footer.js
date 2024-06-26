import React from "react";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="grid place-items-center text-sm  bg-[#3A378C]">
        <div className="h-10"></div>
        <div className="px-8 py-4">
          <p className="mb-4 mt-4">
            Esta página se editó por última vez el 15 de junio de 2024 a las
            01:00.
          </p>
          <p className="mb-4">
            El contenido de esta página está disponible bajo la Licencia
            Creative Commons Atribución 4.0 Internacional (CC BY 4.0), aunque
            pueden aplicarse términos adicionales. Al utilizar este sitio, usted
            acepta nuestros términos de uso y nuestra política de privacidad.
          </p>
        </div>
        <div className="px-8 py-4">
          <div className="flex flex-wrap space-x-4 sm:space-x-8 md:space-x-12">
            <a href="/general/legal/politica-de-privacidad">
              {" "}
              Política de privacidad{" "}
            </a>
            <a href="/general/legal/terminos-y-condiciones">
              {" "}
              Términos de uso{" "}
            </a>
            <a href="/general/legal/terminos-y-condiciones">
              {" "}
              Limitación de responsabilidad{" "}
            </a>
            <a href="/general/legal/terminos-y-condiciones">
              {" "}
              Código de conducta{" "}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
