"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
} from "@chakra-ui/react";

const StudentNotificationTable = () => {
  const [notifications, setStudentNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `../api/database/student-notifications/paginated?pageSize=${pageSize}&page=${page}`
        );
        const data = await response.json();
        console.log(data);
        setStudentNotifications(data.studentNotifications);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Notification Table</h3>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Student ID</Th>
            <Th className="px-4 py-2 w-2/6 bg-[#7A72DE]">Notification ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Read</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications.map((studentNotification) => (
            <Tr key={studentNotification.id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">
                {studentNotification.id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {studentNotification.student_id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {studentNotification.notification_id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {studentNotification.read ? "Read" : "Unread"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={4} justifyContent="flex-end">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-orange-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        >
          Prev
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-orange-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        >
          Next
        </Button>
      </HStack>
    </div>
  );
};

export default StudentNotificationTable;
