import React from "react";
import NotificacionesForm from "@/components/admin/notifications/page";
import NotificationTable from "@/components/admin/dashboards/notification-table";

const NotificationPage = () => {
  return (
    <div>
      <NotificacionesForm></NotificacionesForm>
      <NotificationTable></NotificationTable>
    </div>
  );
};

export default NotificationPage;
