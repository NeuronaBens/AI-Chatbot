"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const StudentPsicometrics = () => {
  const { data: session, status } = useSession();
  const [anxietyLevels, setAnxietyLevels] = useState([]);
  const [stressLevels, setStressLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const userId = session.user.id;
        const anxietyResponse = await fetch(
          `/api/database/students/${userId}/psicometrics/anxiety`
        );
        const anxietyData = await anxietyResponse.json();
        setAnxietyLevels(anxietyData);

        const stressResponse = await fetch(
          `/api/database/students/${userId}/psicometrics/stress`
        );
        const stressData = await stressResponse.json();
        setStressLevels(stressData);
      }
    };
    fetchData();
  }, [session, status]);

  return (
    <div>
      <h2>Anxiety Levels</h2>
      <ul>
        {anxietyLevels.map((level) => (
          <li key={level.id}>
            {level.anxiety} - {new Date(level.date).toLocaleString()}
          </li>
        ))}
      </ul>
      <h2>Stress Levels</h2>
      <ul>
        {stressLevels.map((level) => (
          <li key={level.id}>
            {level.stress} - {new Date(level.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentPsicometrics;
