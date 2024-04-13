"use client";

import { useState, useEffect } from "react";
import GeneralTable from "@/components/general/table";

export default function MessagesTable({ searchParams }) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const [messages, setMessages] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "sender",
      label: "SENDER",
      filterType: "boolean",
      options: null,
      nestedPath: null,
    },
    {
      key: "bookmarked",
      label: "BOOKMARKED",
      filterType: "boolean",
      options: null,
      nestedPath: null,
    },
    {
      key: "date_send",
      label: "DATE SEND",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "deleted",
      label: "DELETED",
      filterType: "boolean",
      options: null,
      nestedPath: null,
    },
    {
      key: "student_id",
      label: "Student ID",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
    {
      key: "text",
      label: "Text",
      filterType: "text",
      options: null,
      nestedPath: null,
    },
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/database/messages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Messages Table</h3>
      {messages && (
        <GeneralTable
          data={messages}
          columns={columns}
          page={page}
          per_page={per_page}
          canSort
          canFilter
          columnsWidth={[
            "w-2/12",
            "w-1/12",
            "w-1/12",
            "w-2/12",
            "w-1/12",
            "w-2/12",
            "w-3/12",
          ]}
        ></GeneralTable>
      )}
    </div>
  );
}
