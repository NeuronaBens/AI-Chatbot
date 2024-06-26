import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { IdManager } from "@/utils/IdManager";
import { createServerClient } from "@/utils/supabase/client";

const supabase = createServerClient();
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);
export const runtime = "edge";

const getAllTasks = async () => {
  const { data, error } = await supabase.from("Task").select();
  return data;
};

const getStudentTasks = async (student_id) => {
  const { data, error } = await supabase
    .from("StudentTask")
    .select()
    .eq("student_id", student_id);
  return data;
};

const createStudentTask = async (student_id, task_id) => {
  const { data, error } = await supabase
    .from("StudentTask")
    .insert({
      id: IdManager.studentTaskId(),
      completed: 0,
      student_id: student_id,
      task_id: task_id,
    })
    .select();

  return data;
};

const processTask = async (completion, student_id) => {
  const tasks = await getAllTasks();
  const studentTasks = await getStudentTasks(student_id);

  const existingTaskIds = studentTasks.map((task) => task.task_id);
  var matchingTask = null;

  if (existingTaskIds.length > 0) {
    matchingTask = tasks.find(
      (task) =>
        completion.toLowerCase().includes(task.name.toLowerCase()) &&
        !existingTaskIds.includes(task.id)
    );
  } else {
    matchingTask = tasks.find((task) =>
      completion.toLowerCase().includes(task.name.toLowerCase())
    );
  }

  if (matchingTask) {
    const newStuTask = await createStudentTask(student_id, matchingTask.id);
  }
};

const SaveToDatabase = async (text, session, position, sender, student_id) => {
  const { data, error } = await supabase
    .from("Message")
    .insert({
      id: IdManager.messageId(),
      text: text,
      session: session,
      position: position,
      sender: sender,
      deleted: false,
      bookmarked: false,
      student_id: student_id,
    })
    .select();

  // Llamar al endpoint de check-risk-cases después de guardar el mensaje
  if (sender) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/database/messages/check-risk-cases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          student_id: student_id,
          message_id: data[0].id,
        }),
      }
    );

    const isRisky = await response.json();
    console.log(isRisky);
  }

  return data;
};

export async function POST(req) {
  const { messages, student_id, session, position } = await req.json();
  const newMessage = messages[messages.length - 1];
  try {
    await SaveToDatabase(
      newMessage.content,
      session,
      position,
      true,
      student_id
    );

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages,
      temperature: 0.7,
    });

    const stream = OpenAIStream(res, {
      onCompletion: async (completion) => {
        const response = await SaveToDatabase(
          completion,
          session,
          position + 1,
          false,
          student_id
        );
        await processTask(completion, student_id);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("Error in OpenAI API call:", err);

    // Implement retries
    let retryCount = 0;
    const maxRetries = 3;
    while (retryCount < maxRetries) {
      try {
        retryCount++;
        const res = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: messages,
          temperature: 0.7,
        });
        const stream = OpenAIStream(res, {
          onCompletion: async (completion) => {
            const response = await SaveToDatabase(
              completion,
              session,
              position + 1,
              false,
              student_id
            );
            await processTask(completion, student_id);
          },
        });
        return new StreamingTextResponse(stream);
      } catch (retryErr) {
        console.error(
          `Retry attempt ${retryCount}: Error in OpenAI API call:`,
          retryErr
        );
        if (retryCount === maxRetries) {
          throw retryErr;
        }
      }
    }
  }
}
