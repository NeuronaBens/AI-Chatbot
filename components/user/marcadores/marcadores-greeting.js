const MarcadoresGreeting = () => {
  return (
    <div className="w-5/6 mx-auto justify-center items-center">
      <h1 className="mt-5 text-4xl text-center font-bold">
        Bienvenido a <span className="text-orange-400">Tus Marcadores!</span>
      </h1>
      <p className="text-center text-lg my-4">
        Aqui podrás ver y gestionar los mensajes que has guardado durante las
        sesiones.
      </p>
      <hr className="m-5"></hr>
    </div>
  );
};

export default MarcadoresGreeting;
