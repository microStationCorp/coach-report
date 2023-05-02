import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const {
        data,
        id,
        code,
        rake_code,
      }: { data: string; id: string; code: string; rake_code?: string } =
        JSON.parse(req.body);

      if (rake_code?.toUpperCase() == "SG") {
        const { data: coach_d, error } = await supabase
          .from("sg_coach_table")
          .update({ [code]: data })
          .eq("id", id)
          .select("*");
      } else if (rake_code?.toUpperCase() == "LHB") {
        const { data: coach_d, error } = await supabase
          .from("lhb_coach_table")
          .update({ [code]: data })
          .eq("id", id)
          .select("*");
      } else {
        const { data: coach_d, error } = await supabase
          .from("coach_list")
          .update({ [code]: data })
          .eq("id", id)
          .select("*");
      }

      res.status(200).json({ success: true });
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
