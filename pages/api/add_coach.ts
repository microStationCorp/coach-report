import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { values } = req.body;
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
                rake_type: values.rake_type,
              },
            ])
            .select();
          res.status(200).json({ success: true, data });
        } catch {
          res.status(500).json({ msg: "error" });
        }
      } else {
        res.json({
          errorStat: true,
          errorMsg: "details already existed",
        });
      }
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
