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
import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function Admin({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [students, setStudents] = useState([]);

  const columns = [
    {
      key: "student_id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "user",
      label: "NAME",
      filterType: "text",
      options: null,
      nestedPath: "name",
    },
    {
      key: "user",
      label: "EMAIL",
      filterType: "text",
      options: null,
      nestedPath: "email",
    },
    {
      key: "career",
      label: "CAREER",
      filterType: "text",
      options: null,
      nestedPath: "name",
    },
    {
      key: "sex",
      label: "SEX",
      filterType: "text",
      options: null,
      nestedPath: "name",
    },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/database/students/include-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const real = (
    <div>
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
      {students && (
        <GeneralTable
          data={students}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
        ></GeneralTable>
      )}
    </div>
  );

  return test;
}
