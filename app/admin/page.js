"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";

const AdminHome = () => {
  return (
    <div>
      <UserTable></UserTable>
      <AnxietyLevelsTable></AnxietyLevelsTable>
    </div>
  );
};

export default AdminHome;
