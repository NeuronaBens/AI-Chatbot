"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function StudentsTasksTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "15";
  const [studentsTasks, setStudentsTasks] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "completed",
      label: "COMPLETED",
      filterType: "select",
      options: [0, 1],
      nestedPath: null,
    },
    {
      key: "student_id",
      label: "STUDENT ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "task_id",
      label: "TASK ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchStudentsTasks = async () => {
      const response = await fetch("/api/database/student-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStudentsTasks(data);
    };
    fetchStudentsTasks();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Student&apos;s Tasks Table</h3>
      {studentsTasks && (
        <GeneralTable
          data={studentsTasks}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/12", "w-1/6", "w-1/6"]}
          route={"admin/tables/students-tasks-table"}
        ></GeneralTable>
      )}
    </div>
  );
}
