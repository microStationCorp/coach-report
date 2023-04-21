import { Database } from "./supabase";

export type CoachListI =  Database["public"]["Tables"]["coach_list"]["Row"]