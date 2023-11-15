import {Tasks} from "@/components/user/tasks";
import Notifications from "@/components/user/notifications";

export default function TasksPage(){
  return(<div>
    <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-6">Actividades</h1>
    <Notifications></Notifications>
  </div>);
}