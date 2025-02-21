// import { createClient } from "@supabase/supabase-js";
// // import { Database } from "../types/supabase";
// import { Database } from "@/types/supabase";

// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseUrl = "https://mjfjkzjntllaqqjsvmwc.supabase.co";
// // console.log("this is the supabase URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
// // const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZmprempudGxsYXFxanN2bXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDQwMzMsImV4cCI6MjA1NTM4MDAzM30.fAmkrgGSmA-lbNmbSJ4cnyvXkERAKAAmCAulekJdPWc";

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Load environment variables (Make sure `.env.local` has these values)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing! Check your environment variables.",
  );
}

// Initialize Supabase Client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
