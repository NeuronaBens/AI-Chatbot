import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="scroll-smooth w-full">
      <div className="container mt-10 w-full">
        <Navbar id="top">
          <NavbarContentAuthentication></NavbarContentAuthentication>
        </Navbar>

        <div className="absolute top-0 left-0 w-full h-full bg-cover z-[-1] bg-gradient-to-r from-[#3A378C] to-[#6C63FF]"></div>
        <section
          id="inicio"
          className="py-20 bg-cover bg-center"
          style={{ backgroundImage: 'url("/bg-image.jpg")' }}
        >
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

        <div className="container mt-10 w-full mx-auto">
          {/* Rest of the content */}

          <section className="ml-8 w-full h-full bg-cover py-16 bg-gradient-to-r from-[#6C63FF] to-[#3A378C]">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-white">
                Funcionalidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Ejercicios relajantes
                  </h3>
                  <p className="text-gray-600">
                    Técnicas de relajación y ejercicios de mindfulness para
                    reducir la ansiedad durante momentos estresantes.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Tips Saludables
                  </h3>
                  <p className="text-gray-600">
                    Consejos para mantener un equilibrio saludable entre el
                    trabajo y la vida personal para gestionar compromisos
                    académicos y bienestar personal.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Cuidado personal
                  </h3>
                  <p className="text-gray-600">
                    Sugerencias de rutinas y actividades de autocuidado para
                    incorporar en tu rutina diaria y mejorar tu salud mental.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Ansiedad Social
                  </h3>
                  <p className="text-gray-600">
                    Técnicas para manejar la ansiedad en los ambientes académico
                    y social para ayudarte a socializar con más facilidad.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Ejercicios Creativos
                  </h3>
                  <p className="text-gray-600">
                    Ejercicios creativos y personalizados para ayudarte a
                    mantener la calma durante situaciones que desencadenan
                    ansiedad.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#3A378C]">
                    Calidad de sueño
                  </h3>
                  <p className="text-gray-600">
                    Sugerencias para mejorar la calidad de tu sueño, ya que
                    dormir lo suficiente es fundamental para controlar la
                    ansiedad.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="ml-8 container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#3A378C]">
              Información
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <Image
                  src="/Man-feeling-calm.jpg"
                  alt="Man feeling calm"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    Cómo Funciona
                  </h3>
                  <p className="text-white leading-relaxed">
                    Nuestro chatbot está basado en inteligencia artificial y
                    utiliza ejercicios basados en evidencia y recursos para
                    ayudarte a manejar tu ansiedad y estrés. Está diseñado para
                    mantener conversaciones naturales y puede guiarte en el
                    manejo de tus emociones, ayudarte a desafiar pensamientos
                    negativos, sugerir herramientas y recursos, y utilizar
                    técnicas terapéuticas comprobadas, incluyendo un seguimiento
                    de tu estado de ánimo y bienestar emocional.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/Woman-feeling-calm.jpg"
                  alt="Woman feeling calm"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    Nuestro Enfoque
                  </h3>
                  <p className="text-white leading-relaxed">
                    Nuestro chatbot ha sido diseñado como una herramienta
                    complementaria a los servicios profesionales de apoyo, no
                    como un reemplazo de la terapia en persona. Está capacitado
                    para ayudar a moderar los síntomas de estrés y ansiedad
                    porque creemos que todos merecen acceso al apoyo
                    psicológico.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className="ml-16 py-20 bg-cover bg-center"
            style={{ backgroundImage: 'url("/traquil-lake.jpg")' }}
          >
            <div className="container mx-auto px-4">
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
      </div>
      <Footer></Footer>
    </div>
  );
}
