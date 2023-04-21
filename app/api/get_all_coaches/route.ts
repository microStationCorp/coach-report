import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
  const { data: coach_list, error } = await supabase
    .from("coach_list")
    .select("*");


  if (!error) return NextResponse.json({ coach_list });
  return NextResponse.json({ msg: error.message }, { status: 401 });
}
