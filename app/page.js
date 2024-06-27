// app/page.js
import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";
import Image from "next/image";
import FeatureCard from "@/components/general/feature-card";
import InformationCard from "@/components/general/information-card";

export default function Home() {
  return (
    <div>
      <Navbar id="top">
        <NavbarContentAuthentication></NavbarContentAuthentication>
      </Navbar>
      {/* Hero section */}
      <section id="inicio" className="py-32 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="animate-slideleft w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl font-bold text-[#261039] text-center mb-8">
                Bienvenido a <span className="text-[#3A378C]">Calmy</span>, tu
                Chatbot de Salud Mental con IA!
              </h1>
              <p className="text-lg text-center text-[#261039]">
                Nuestro chatbot está diseñado para ayudarte a gestionar la
                ansiedad y el estrés, y mejorar tu salud mental en general. Como
                estudiantes entendemos que es posible que enfrentes muchos
                desafíos que pueden afectar tu bienestar. Nuestro chatbot ofrece
                una gama de funcionalidades para ayudarte a gestionar estos
                desafíos.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/chatbot.png"
                alt="chatbot"
                width={1050}
                height={900}
                className="animate-appearAbove mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features section */}
      <section
        id="funcionalidades"
        className="w-full h-full bg-cover py-16 px-16 bg-[#FFFFFF]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#261039]">
            <a href="#top">Funcionalidades</a>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Ejercicios relajantes"
              description="Técnicas de relajación y ejercicios de mindfulness para reducir la ansiedad durante momentos estresantes."
            />
            <FeatureCard
              title="Tips Saludables"
              description="Consejos para mantener un equilibrio saludable entre el trabajo y la vida personal para gestionar compromisos académicos y bienestar personal."
            />
            <FeatureCard
              title="Cuidado personal"
              description="Sugerencias de rutinas y actividades de autocuidado para incorporar en tu rutina diaria y mejorar tu salud mental."
            />
            <FeatureCard
              title="Ansiedad Social"
              description="Técnicas para manejar la ansiedad en los ambientes académico y social para ayudarte a socializar con más facilidad."
            />
            <FeatureCard
              title="Ejercicios Creativos"
              description="Ejercicios creativos y personalizados para ayudarte a mantener la calma durante situaciones que desencadenan ansiedad."
            />
            <FeatureCard
              title="Calidad de sueño"
              description="Sugerencias para mejorar la calidad de tu sueño, ya que dormir lo suficiente es fundamental para controlar la ansiedad."
            />
          </div>
        </div>
      </section>
      {/* Information section */}
      <section id="informacion" className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#261039]">
            <a href="#top">Información</a>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InformationCard
              image="/Man-feeling-calm.jpg"
              title="Cómo Funciona"
              description="Nuestro chatbot está basado en inteligencia artificial y utiliza ejercicios basados en evidencia y recursos para ayudarte a manejar tu ansiedad y estrés. Está diseñado para mantener conversaciones naturales y puede guiarte en el manejo de tus emociones, ayudarte a desafiar pensamientos negativos, sugerir herramientas y recursos, y utilizar técnicas terapéuticas comprobadas, incluyendo un seguimiento de tu estado de ánimo y bienestar emocional."
            />
            <InformationCard
              image="/Woman-feeling-calm.jpg"
              title="Nuestro Enfoque"
              description="Nuestro chatbot ha sido diseñado como una herramienta complementaria a los servicios profesionales de apoyo, no como un reemplazo de la terapia en persona. Está capacitado para ayudar a moderar los síntomas de estrés y ansiedad porque creemos que todos merecen acceso al apoyo psicológico."
            />
          </div>
        </div>
      </section>

      {/* Download app section */}
      <section
        id="descargar"
        className="py-20 bg-cover bg-center w-full"
        style={{ backgroundImage: 'url("/traquil-lake.jpg")' }}
      >
        <div className="container mx-auto px-4 w-full">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">
            <a href="#top">Comienza tu camino hacia la tranquilidad</a>
          </h2>
          <p className="text-lg text-center text-white mb-8">
            Descarga nuestra app y empieza a mejorar tu bienestar emocional hoy
            mismo.
          </p>
          <div className="flex justify-center">
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 text-[#261039] bg-[#FFFFFF] rounded-full hover:shadow-lg transition-all duration-300 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Descargar App
            </a>
            <div className="mx-8"></div>
            <a
              href="/general/register"
              className="inline-flex items-center px-8 py-3 text-[#261039] bg-[#FFFFFF] rounded-full hover:shadow-lg transition-all duration-300 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              Iniciar Ahora
            </a>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
