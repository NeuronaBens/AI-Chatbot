"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";
import StressLevelsTable from "@/components/admin/dashboards/stress-levels-table";
import ComplaintTable from "@/components/admin/dashboards/complaints-table";

const AdminHome = () => {
  const real = (
    <div>
      <UserTable></UserTable>
      <AnxietyLevelsTable></AnxietyLevelsTable>
      <StressLevelsTable></StressLevelsTable>
      <ComplaintTable></ComplaintTable>
    </div>
  );

  const test = (
    <div>
      <ComplaintTable></ComplaintTable>
    </div>
  );

  return real;
};

export default AdminHome;
