"use client";

import UserTable from "@/components/admin/dashboards/user-table";
import AnxietyLevelsTable from "@/components/admin/dashboards/anxiety-levels-table";
import StressLevelsTable from "@/components/admin/dashboards/stress-levels-table";
import ComplaintTable from "@/components/admin/dashboards/complaints-table";
import MessageTable from "@/components/admin/dashboards/messages-table";
import SexTable from "@/components/admin/dashboards/sex-table";
import CareerTable from "@/components/admin/dashboards/career-table";
import TaskTable from "@/components/admin/dashboards/task-table";
import StudentTaskTable from "@/components/admin/dashboards/student-task-table";

export default function Admin({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

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
      <StudentTaskTable page={page} per_page={per_page}></StudentTaskTable>
    </div>
  );

  return test;
}
