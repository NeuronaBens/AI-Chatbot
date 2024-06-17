"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

export default function ConversationHistory() {
  const [messages, setMessages] = useState([]);
  const [messageDays, setMessageDays] = useState([]);
  const { data: session, status } = useSession();

  const fetchMessages = () => {
    fetch(`/api/database/students/${session.user.id}/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    messages.forEach((message) => {
      const sendDate = new Date(message.date_send);
      const day = sendDate.toISOString().split("T")[0];
      if (!groupedMessages[day]) {
        groupedMessages[day] = [];
      }
      groupedMessages[day].push(message);
    });

    const groups = [];
    Object.entries(groupedMessages).map(([day, values]) => {
      groups.push([day, values]);
    });
    return groups;
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchMessages();
      if (messages.length > 0) {
        const groupedMessages = groupMessagesByDate(messages);
        setMessageDays(groupedMessages);
      }
    }
  }, [status, messages.length]);

  return (
    <div className="text-black">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Accordion allowToggle className="mr-10 space-y-8">
          {messageDays.map((value, i1) => (
            <AccordionItem key={i1}>
              <h2 className="py-2 bg-[#F9F9FF]">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Día {value[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="bg-[#C8C2F2]">
                {value[1].map((message, i2) => (
                  <div key={i2}>{message.text}</div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
