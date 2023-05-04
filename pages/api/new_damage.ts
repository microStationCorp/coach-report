import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { values } = req.body;

      const { data, error } = await supabase
        .from("damage_data")
        .insert([
          {
            rake: values.rake,
            coach: values.coach,
            description: values.description,
            damage_type: values.damage_type,
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      res.status(200).json({success:true, data });
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
