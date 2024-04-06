import React from "react";
import NotificacionesForm from "@/components/admin/notifications/page";
import NotificationTable from "@/components/admin/dashboards/notification-table";
import StudentNotificationTable from "@/components/admin/dashboards/student-notification-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function NotificationPage() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <NotificacionesForm {...session}></NotificacionesForm>
      <NotificationTable></NotificationTable>
      <StudentNotificationTable></StudentNotificationTable>
    </div>
  );
};


