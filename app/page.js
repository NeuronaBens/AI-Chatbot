import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";
import Image from "next/image";

export default function Home() {

  
  
  return (
    <div className="scroll-smooth">
      <div className=" container mt-10 w-full">

        <Navbar id="top">
          <NavbarContentAuthentication ></NavbarContentAuthentication>
        </Navbar>

        
        <div  class="absolute top-0 left-0 w-full h-full bg-cover z-[-1] bg-[#3A378C]" ></div>
        <section id="inicio" >
          <div class="animate-slideleft">
            <h1 className=" text-3xl font-bold text-white text-center my-20">
              Bienvenido a tu Chatbot de Salud Mental con IA!
            </h1>
            <p className="text-lg text-center text-white mx-60">
              Nuestro chatbot está diseñado para ayudarte a gestionar la ansiedad y el estrés, y
              mejorar tu salud mental en general. Como estudiantes entendemos que
              es posible que enfrente muchos desafíos que pueden afectar su bienestar. Nuestro 
              chatbot ofrece una gama de funcionalidades para ayudarle a gestionar estos
              desafíos.
            </p>
          </div>
          <Image src="/chatbot.png" alt="chatbot" width= {1050} height= {900} className="animate-appearAbove mx-auto mt-20"/>
        </section>
        
        <section id="funcionalidades">
          <h1  className="text-3xl font-bold text-center my-16"><a href="#top">
            Funcionalidades</a>
          </h1>
          <div className="w-[1200px] grid gap-y-8 text-white grid-cols-3 grid-rows-2 place-items-center gap-x-8 mx-auto my-12" data-te-animation-start="onScroll">
            <div class="grid col-span-1 row-span-1 justify-items-center py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <svg className="h-16 w-16" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"></path>
            </svg>
            <h5 class="mb-2 text-2xl font-semibold tracking-tight">Ejercicios relajantes</h5>
            <p class="mb-3 font-normal ">Técnicas de relajación y ejercicios de mindfulness para reducir la ansiedad durante momentos estresantes.</p>
            </div>
            <div class="col-span-1 row-span-1 grid justify-items-center  py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight ">Tips Saludables</h5>
              <p class="mb-3 font-normal">Consejos para mantener un equilibrio saludable entre el trabajo y la vida personal para gestionar compromisos académicos y bienestar personal.</p>
            </div>
            <div class="col-span-1 row-span-1 grid justify-items-center py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight ">Cuidado personal</h5>
              <p class="mb-3 font-normal ">Sugerencias de rutinas y actividades de autocuidado para incorporar en tu rutina diaria para mejorar tu salud mental.</p>
            </div>
            <div class="col-span-1 row-span-1 grid justify-items-center  py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight ">Ansiedad Social</h5>
              <p class="mb-3 font-normal ">Técnicas para manejar la ansiedad en los ambientes académico y social para ayudarte a socializar más.</p>
            </div>
            <div class="col-span-1 row-span-1 grid justify-items-center  py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight ">Ejercicios de Respiración</h5>
              <p class="mb-3 font-normal ">Ejercicios de respiración para ayudarle a mantener la calma durante situaciones que desencadenar ansiedad.</p>
            </div>
            <div class="col-span-1 row-span-1 grid justify-items-center py-6 px-2 bg-[#7471D9] hover:bg-[#AAA7F2] hover:text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight ">Calidad de sueño</h5>
              <p class="mb-3 font-normal ">Sugerencias para mejorar la calidad de tu sueño, ya que dormir lo suficiente es fundamental para controlar la ansiedad.</p>
            </div>
          </div>
        </section>
        
        <section className="grid gap-24  bg-[#AAA7F2] py-12">
          <section className="flex flex-row mx-8">
            <div id="como" className="grid place-items-center w-3/6">
              <h1 className="text-3xl font-bold "><a href="#top"> Como Funciona </a> </h1>
              <p className="mx-12">
                Nuestro chatbot esta basado en inteligencia artificial y usa ejercicios
                basado en la evidencia y recursos para ayudarte a manejar tu ansiedad y
                estrés. Nuestro chatbot esta diseñado para mantener conversaciones con 
                personas reales y te puede guiar a manejar tus emociones, ayudarte a desafiar 
                pensamientos negativos, sugiere herramientas y recursos, y se involucra contigo
                con técnicas terapeúticas comprobadas, incluído un senguimiento de tu ánimo
                y tu estado emocional conciente.
              </p>
            </div>
            <div   className="grid place-items-center w-3/6 ">
              <img src="/OIG.jpg" alt="chatbot"  className="w-1/2"/>
            </div>   
          </section>
          <section className="flex flex-row-reverse mx-8">
            <div id="enfoque" className="grid place-items-center w-3/6">
              <h1 className="text-3xl font-bold "><a href="#top">Nuestro Enfoque </a></h1>
              <p className="w-5/6 ">
                Nuestro chatbot ha sido diseñado para ser una útil herramienta adicional
                a los servicios profesionales de apoyo, no es un reemplazo de la terapia
                en persona. Nuestro chatbot esta capacitado para ayudar a moderar los síntomas
                de estrés y ansiedad y creemos que todos merecen acceso a apoyo de salud
                mental.
              </p>
            </div>
            <div className="grid place-items-center w-3/6 ">
              <img src="/logo-img.png" alt="chatbot"  className="w-1/2"/>
            </div>
          </section>
        </section>
        <section id="contacto" className="w-full md:w-screen-md mx-auto p-12">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">
              <a href="#top">Preguntanos lo que sea sobre Calmbot</a>
            </h1>
            <p className="text-gray-700">
              Si tienes alguna pregunta o recomendación sobre Calmbot, nos encantaría
              que nos lo comentes. Lllena el formulario de abajo y te responderemos
              lo más pronto posible
            </p>
          </div>
          <div className="p-6 border border-gray-300 sm:rounded-md">
            <form method="POST" >
              <label className="block mb-6">
                <span className="text-gray-700">Tu Nombre</span>
                <input type="text" name="name"
                  className="block w-full mt-1 p-2 border border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Joe Bloggs"/>
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">Email</span>
                <input name="email" type="email"
                  className="block w-full mt-1 p-2 border border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="joe.bloggs@example.com"/>
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">Mensaje</span>
                <textarea
                  name="message"
                  className="block w-full mt-1 p-2 border border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows="4" placeholder="Enter your message here"
                ></textarea>
              </label>
              <button  className="bg-[#3A378C] text-white py-2 px-4 rounded hover:bg-[#7471D9] focus:outline-none focus:ring-2 focus:[#AAA7F2] focus:ring-offset-2">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
