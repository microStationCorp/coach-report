import { Database } from "./supabase";

export type CoachDataI = Database["public"]["Tables"]["coach_list"]["Row"];
export type SGTable = Database["public"]["Tables"]["sg_coach_table"]["Row"];
export type LHBTable = Database["public"]["Tables"]["lhb_coach_table"]["Row"];
