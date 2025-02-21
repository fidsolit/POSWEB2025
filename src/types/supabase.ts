export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          selling_price: number;
          cost_price: number;
          quantity_in_stock: number;
          category_id: string | null;
          expiry_date: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          selling_price: number;
          cost_price: number;
          quantity_in_stock?: number;
          category_id?: string | null;
          expiry_date: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          selling_price?: number;
          cost_price?: number;
          quantity_in_stock?: number;
          category_id?: string | null;
          expiry_date?: string;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
