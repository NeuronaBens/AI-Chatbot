"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";
import StressLevelsTable from "@/components/admin/dashboards/stress-levels-table";
import ComplaintTable from "@/components/admin/dashboards/complaints-table";
import MessageTable from "@/components/admin/dashboards/messages-table";

const AdminHome = () => {
  const real = (
    <div>
      <UserTable></UserTable>
      <AnxietyLevelsTable></AnxietyLevelsTable>
      <StressLevelsTable></StressLevelsTable>
      <ComplaintTable></ComplaintTable>
      <MessageTable></MessageTable>
    </div>
  );

  const test = (
    <div>
      <MessageTable></MessageTable>
    </div>
  );

  return test;
};

export default AdminHome;
