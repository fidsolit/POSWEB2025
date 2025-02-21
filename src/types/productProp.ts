export interface ProductProp {
  id: string;
  name: string;
  selling_price: number;
  cost_price: number;
  quantity_in_stock: number;
  // status?: string;
  category_id: string;
  expiry_date: string;
  created_at?: string;
}
