"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Complaints = () => {
  const { data: session, status } = useSession();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const userId = session.user.id;
        const res = await fetch(
          '/api/database/complaints',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setComplaints(data);
      }
    };
    fetchData();
  }, [session, status]);

  return (
<div className="mx-auto justify-center items-center mt-4">
      <br></br>
      <hr className="m-5"></hr>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complaints
      </h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-black h-full border-2 left-1/2"></div>
        {complaints.map((level, index) => (
          <div
            key={level.id}
            className={`flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="order-1 bg-gradient-to-r from-[#7471D9] to-purple-700 rounded-lg shadow-xl w-5/12 px-6 py-2 text-white">
              <h3 className="mb-1 font-bold">
                {level.content}
              </h3>
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Fecha: {new Date(level.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;