"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function AnxietyTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [anxietyLevels, setAnxietyLevels] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "anxiety",
      label: "ANXIETY",
      filterType: "number",
      options: null,
      nestedPath: null,
    },
    {
      key: "date",
      label: "DATE",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "student_id",
      label: "STUDENT ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchAnxietyLevels = async () => {
      const response = await fetch("/api/database/anxiety-levels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAnxietyLevels(data);
    };
    fetchAnxietyLevels();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Anxiety Levels Table</h3>
      {anxietyLevels && (
        <GeneralTable
          data={anxietyLevels}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/6", "w-1/6", "w-1/6"]}
        ></GeneralTable>
      )}
    </div>
  );
}
