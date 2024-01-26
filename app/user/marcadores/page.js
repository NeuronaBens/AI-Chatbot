import Greeting from "@/components/general/greeting";
import MarcadoresContainer from "@/components/user/marcadores/marcadores-container";

export default function Home() {
  return (
    <div>
      <Greeting title="Tus Marcadores!" text="Aqui podrás ver y gestionar los mensajes que has guardado durante las sesiones."></Greeting>
      <MarcadoresContainer />
    </div>
  );
}
