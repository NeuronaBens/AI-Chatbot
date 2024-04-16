// app/page.js
import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";
import Image from "next/image";
import FeatureCard from "@/components/general/feature-card";
import InformationCard from "@/components/general/information-card";

export default function Home() {
  return (
    <div className="scroll-smooth w-full">
      <div className="container">
        <Navbar id="top">
          <NavbarContentAuthentication></NavbarContentAuthentication>
        </Navbar>

        <div className="relative">
          {/* Background gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#3A378C] to-[#6C63FF] z-[-1]"></div>

          {/* Hero section */}
          <section id="inicio" className="py-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="animate-slideleft w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Bienvenido a tu Chatbot de Salud Mental con IA!
                  </h1>
                  <p className="text-lg text-center text-white">
                    Nuestro chatbot está diseñado para ayudarte a gestionar la
                    ansiedad y el estrés, y mejorar tu salud mental en general.
                    Como estudiantes entendemos que es posible que enfrentes
                    muchos desafíos que pueden afectar tu bienestar. Nuestro
                    chatbot ofrece una gama de funcionalidades para ayudarte a
                    gestionar estos desafíos.
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
        </div>

        {/* Features section */}
        <section className="w-full h-full bg-cover py-16 bg-gradient-to-r from-[#6C63FF] to-[#3A378C]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">
              Funcionalidades
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
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold mb-12 text-center text-[#3A378C]">
            Información
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
        </section>

        {/* Download app section */}
        <section
          className="py-20 bg-cover bg-center w-full"
          style={{ backgroundImage: 'url("/traquil-lake.jpg")' }}
        >
          <div className="container mx-auto px-4 w-full">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">
              Comienza tu camino hacia la tranquilidad
            </h2>
            <p className="text-lg text-center text-white mb-8">
              Descarga nuestra app y empieza a mejorar tu bienestar emocional
              hoy mismo.
            </p>
            <div className="flex justify-center">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 text-white bg-gradient-to-r from-[#3A378C] to-[#6C63FF] rounded-full hover:shadow-lg transition-all duration-300 text-lg"
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
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
