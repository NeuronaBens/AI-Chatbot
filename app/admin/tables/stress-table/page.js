"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function StressTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "15";
  const [stressLevels, setStressLevels] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "stress",
      label: "STRESS",
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
    const fetchStressLevels = async () => {
      const response = await fetch("/api/database/stress-levels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStressLevels(data);
    };
    fetchStressLevels();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Stress Levels Table</h3>
      {stressLevels && (
        <GeneralTable
          data={stressLevels}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/6", "w-1/6", "w-1/6"]}
          route={"admin/tables/stress-table"}
        ></GeneralTable>
      )}
    </div>
  );
}
