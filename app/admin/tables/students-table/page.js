"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function StudentsTable({ searchParams }) {
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

  return (
    <div>
      <h3 className="font-bold">Students Table</h3>
      {students && (
        <GeneralTable
          data={students}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["1/6", "1/6", "1/6", "1/6", "1/6", "1/6"]}
        ></GeneralTable>
      )}
    </div>
  );
}
