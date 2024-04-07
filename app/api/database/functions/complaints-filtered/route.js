import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(req) {
  const {initial_date,final_date,users_emails} = await req.json();

  const { data, error } = await supabase.rpc('complaintsfiltered',{initial:initial_date,final:final_date,emails:users_emails});

  return new Response(JSON.stringify(data));
}