"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function StressTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [complaints, setComplaints] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
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
    {
      key: "message",
      label: "MESSAGE ID",
      filterType: "text",
      options: null,
      nestedPath: "id",
    },
    {
      key: "message",
      label: "MESSAGE TEXT",
      filterType: "text",
      options: null,
      nestedPath: "text",
    },
    {
      key: "date",
      label: "DATE",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch("/api/database/complaints/include-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setComplaints(data);
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Complaints Table</h3>
      {complaints && (
        <GeneralTable
          data={complaints}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={["w-2/12", "w-2/12", "w-2/12", "w-5/12", "w-1/12"]}
        ></GeneralTable>
      )}
    </div>
  );
}
