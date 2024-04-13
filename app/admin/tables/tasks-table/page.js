"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function TasksTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [tasks, setTasks] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "name",
      label: "NAME",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "content",
      label: "CONTENT",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/database/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Tasks Table</h3>
      {tasks && (
        <GeneralTable
          data={tasks}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/3", "w-1/2"]}
          route={"admin/tables/tasks-table"}
        ></GeneralTable>
      )}
    </div>
  );
}
