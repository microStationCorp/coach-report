import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      const { data, error } = await supabase
        .from("coach_list")
        .delete()
        .eq("id", req.query.id)
        .select();
      res.status(200).json({ data });
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
