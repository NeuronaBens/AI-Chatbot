"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function SexesTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const [sexes, setSexes] = useState([]);

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
  ];

  useEffect(() => {
    const fetchSexes = async () => {
      const response = await fetch("/api/database/sexes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSexes(data);
    };
    fetchSexes();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Sexes Table</h3>
      {sexes && (
        <GeneralTable
          data={sexes}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-1/6", "w-1/6"]}
          route={"admin/tables/sexes-table"}
        ></GeneralTable>
      )}
    </div>
  );
}
