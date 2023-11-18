import Greeting from "@/components/general/greeting";
import Notifications from "@/components/user/notifications";


export default function NotificationPermission(){
  return (
    <div>
      <Greeting title={"Tus Notificaciones!"} text={"Acá podrás ver todas las notificaciones que has recibido."}></Greeting>
      <Notifications></Notifications>
    </div>
  );
}