"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";
import StressLevelsTable from "@/components/admin/dashboards/stress-levels-table";

const AdminHome = () => {
  const real = (
    <div>
      <UserTable></UserTable>
      <AnxietyLevelsTable></AnxietyLevelsTable>
      <StressLevelsTable></StressLevelsTable>
    </div>
  );

  const test = (
    <div>
      <StressLevelsTable></StressLevelsTable>
    </div>
  );

  return test;
};

export default AdminHome;
