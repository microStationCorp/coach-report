import { Database } from "./supabase";

export type CoachDataI = Database["public"]["Tables"]["coach_list"]["Row"]