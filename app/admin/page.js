"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";
import StressLevelsTable from "@/components/admin/dashboards/stress-levels-table";
import ComplaintTable from "@/components/admin/dashboards/complaints-table";
import MessageTable from "@/components/admin/dashboards/messages-table";
import SexTable from "@/components/admin/dashboards/sex-table";
import CareerTable from "@/components/admin/dashboards/career-table";
import TaskTable from "@/components/admin/dashboards/task-table";

const AdminHome = () => {
  const real = (
    <div>
      <UserTable></UserTable>
      <AnxietyLevelsTable></AnxietyLevelsTable>
      <StressLevelsTable></StressLevelsTable>
      <ComplaintTable></ComplaintTable>
      <MessageTable></MessageTable>
      <SexTable></SexTable>
      <CareerTable></CareerTable>
      <TaskTable></TaskTable>
    </div>
  );

  const test = (
    <div>
      <SexTable></SexTable>
    </div>
  );

  return test;
};

export default AdminHome;
