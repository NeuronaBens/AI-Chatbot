const ChatWelcome = () => {
  return (
    <div className="w-5/6 mx-auto justify-center items-center">
      <h1 className="mt-5 text-4xl text-center font-bold">
        Bienvenido a <span className="text-[#7471D9]">Calmbot!</span>
      </h1>
      <p className="text-center text-lg my-4">
        Tu chatbot de autoayuda y manejo del estrés y la ansiedad.
      </p>
      <p className="text-center mb-5 text-gray-500">
        Inicia tu conversación con un saludo.
      </p>
      <hr className="m-5"></hr>
    </div>
  );
};

export default ChatWelcome;
