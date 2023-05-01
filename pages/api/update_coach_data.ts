import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { data, id, code }: { data: string; id: string; code: string } =
        JSON.parse(req.body);

      const { data: coach_d, error } = await supabase
        .from("coach_list")
        .update({ [code]: data })
        .eq("id", id)
        .select("*");

      res.status(200).json({ success: true, coach_d });
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
