export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      coach_list: {
        Row: {
          base: string | null
          coach_number: string | null
          coach_type: string | null
          created_at: string | null
          id: string
          p_date: string | null
          r_date: string | null
          rake_type: string | null
        }
        Insert: {
          base?: string | null
          coach_number?: string | null
          coach_type?: string | null
          created_at?: string | null
          id?: string
          p_date?: string | null
          r_date?: string | null
          rake_type?: string | null
        }
        Update: {
          base?: string | null
          coach_number?: string | null
          coach_type?: string | null
          created_at?: string | null
          id?: string
          p_date?: string | null
          r_date?: string | null
          rake_type?: string | null
        }
      }
      damage_data: {
        Row: {
          coach: string | null
          created_at: string | null
          damage_type: string | null
          description: string | null
          id: string
          rake: string | null
        }
        Insert: {
          coach?: string | null
          created_at?: string | null
          damage_type?: string | null
          description?: string | null
          id?: string
          rake?: string | null
        }
        Update: {
          coach?: string | null
          created_at?: string | null
          damage_type?: string | null
          description?: string | null
          id?: string
          rake?: string | null
        }
      }
      lhb_coach_table: {
        Row: {
          cell: string | null
          coach: string | null
          condenser_motor: string | null
          created_at: string | null
          ebc: string | null
          id: string
          microprocessor: string | null
          rbc: string | null
          refrigarent: string | null
          rmpu_package: string | null
        }
        Insert: {
          cell?: string | null
          coach?: string | null
          condenser_motor?: string | null
          created_at?: string | null
          ebc?: string | null
          id?: string
          microprocessor?: string | null
          rbc?: string | null
          refrigarent?: string | null
          rmpu_package?: string | null
        }
        Update: {
          cell?: string | null
          coach?: string | null
          condenser_motor?: string | null
          created_at?: string | null
          ebc?: string | null
          id?: string
          microprocessor?: string | null
          rbc?: string | null
          refrigarent?: string | null
          rmpu_package?: string | null
        }
      }
      sg_coach_table: {
        Row: {
          ac_plant: string | null
          alternator: string | null
          cell: string | null
          coach: string | null
          condenser_motor: string | null
          created_at: string | null
          id: string
          inverter: string | null
          refrigarent: string | null
          rru: string | null
        }
        Insert: {
          ac_plant?: string | null
          alternator?: string | null
          cell?: string | null
          coach?: string | null
          condenser_motor?: string | null
          created_at?: string | null
          id?: string
          inverter?: string | null
          refrigarent?: string | null
          rru?: string | null
        }
        Update: {
          ac_plant?: string | null
          alternator?: string | null
          cell?: string | null
          coach?: string | null
          condenser_motor?: string | null
          created_at?: string | null
          id?: string
          inverter?: string | null
          refrigarent?: string | null
          rru?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
