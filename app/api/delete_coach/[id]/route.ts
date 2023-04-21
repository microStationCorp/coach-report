import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("coach_list")
    .delete()
    .eq("id", params.id)
    .select();

  return NextResponse.json({ msg: "deleted", data });
}
