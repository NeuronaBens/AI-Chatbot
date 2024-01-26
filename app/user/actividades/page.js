import Greeting from "@/components/general/greeting";
import Tasks from "@/components/user/tasks";

export default function TasksSection() {
  return (
    <div>
      <Greeting
        title={"Tus Actividades!"}
        text={"Acá podrás ver todas tus actividades recomendadas por Calmbot."}
      ></Greeting>
      <Tasks></Tasks>
    </div>
  );
}
