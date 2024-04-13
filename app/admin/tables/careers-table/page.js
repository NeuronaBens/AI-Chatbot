"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function CareersTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [careers, setCareers] = useState([]);

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
      key: "description",
      label: "DESCRIPTION",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await fetch("/api/database/careers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCareers(data);
    };
    fetchCareers();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Careers Table</h3>
      {careers && (
        <GeneralTable
          data={careers}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/6", "w-2/6"]}
          route={"admin/tables/careers-table"}
        ></GeneralTable>
      )}
    </div>
  );
}
