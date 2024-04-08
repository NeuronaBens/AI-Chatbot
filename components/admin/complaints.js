"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TokenBox from "../general/tokenbox";

const Complaints = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (session && session.user) {
        const res = await fetch("/api/database/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const user_emails = data.map((student) => student.user.email);
        setOptions(user_emails);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session, status]);

  const handleTokenChange = (tokens) => {
    setEmails(tokens);
    // Do something with the selected tokens
    console.log("Selected tokens:", tokens);
  };

  const search = async () => {
    if (session && session.user) {
      const res = await fetch("/api/database/functions/complaints-filtered", {
        method: "POST",
        body: JSON.stringify({
          initial_date: initialDate,
          final_date: finalDate,
          users_emails: emails,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setComplaints(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await search();
  };

  return (
    <div className="mx-auto justify-center items-center mt-4">
      <br></br>
      <hr className="m-5"></hr>
      <h2 className="text-2xl font-bold mb-4 text-center">Complaints</h2>
      {!isLoading && (
        <form
          className=" rounded-md shadow-xl bg-[#E0DFFF] p-4 mx-4 space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row space-x-8">
            <div className="flex flex-col">
              <label htmlFor="initialDate"> Fecha Inicial: </label>
              <DatePicker
                id="initialDate"
                name="initialDate"
                selected={initialDate}
                onChange={(date) => setInitialDate(date)}
                className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="finalDate"> Fecha Final: </label>
              <DatePicker
                id="finalDate"
                name="finalDate"
                selected={finalDate}
                onChange={(date) => setFinalDate(date)}
                className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="emails"> Usuarios seleccionados: </label>
            <TokenBox options={options} onChange={handleTokenChange}></TokenBox>
          </div>

          <div className="flex justify-center items-center py-4">
            <button
              type="submit"
              className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Buscar
            </button>
          </div>
        </form>
      )}
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
              <h3 className="mb-1 font-bold">{level.content}</h3>
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
