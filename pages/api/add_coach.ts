import { supabase } from "@/utils/supabaseClient";
import { CoachDataI } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { values }: { values: CoachDataI } = req.body;

      //check if coach already present
      const { data: coach_list, error } = await supabase
        .from("coach_list")
        .select("*")
        .eq("base", values.base)
        .eq("coach_number", values.coach_number)
        .eq("coach_type", values.coach_type)
        .eq("rake_type", values.rake_type);

      if (coach_list?.length == 0) {
        try {
          //if not present create a coach
          const { data: created_coach, error } = await supabase
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

          //create a sg or lhb equipment table
          console.log(values.rake_type, created_coach![0].rake_type);
          if (values.rake_type?.toUpperCase() == "SG") {
            const { data, error } = await supabase
              .from("sg_coach_table")
              .insert([{ coach: created_coach![0].id }]);
          } else {
            const { data, error } = await supabase
              .from("lhb_coach_table")
              .insert([{ coach: created_coach![0].id }]);
          }
          res.status(200).json({ success: true, data: created_coach });
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
