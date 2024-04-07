import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { IdManager } from "@/utils/IdManager";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
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

  return data;
};

export async function POST(req) {
  const { messages, student_id, session, position } = await req.json();
  const newMessage = messages[messages.length - 1];

  await SaveToDatabase(newMessage.content, session, position, true, student_id);

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
}
