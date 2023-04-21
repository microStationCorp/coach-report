import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { values } = await req.json();

  const { data: coach_list, error } = await supabase
    .from("coach_list")
    .select("*")
    .eq("base", values.base)
    .eq("coach_number", values.coach_number)
    .eq("coach_type", values.coach_type);

  if (coach_list?.length == 0) {
    try {
      const { data, error } = await supabase
        .from("coach_list")
        .insert([
          {
            base: values.base,
            coach_number: values.coach_number,
            coach_type: values.coach_type,
          },
        ])
        .select();

      return NextResponse.json({ success: true, data });
    } catch {
      return NextResponse.json({ msg: "error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({
      errorStat: true,
      errorMsg: "details already existed",
    });
  }
}
