//greetings

const Greeting = ({ title, text }) => {
  return (
    <div className="w-5/6 mx-auto justify-center items-center">
      <h1 className="mt-5 text-4xl text-center font-bold">
        Bienvenido a <span className="text-[#7471D9]">{title}</span>
      </h1>
      <p className="text-center text-lg my-4">{text}</p>
      <hr className="m-5"></hr>
    </div>
  );
};

export default Greeting;
