import { Product } from "./Product";

export interface Stock {
    id: number;
    quantity: number;
    volume: number;
    productId: number;
    product?: Product;
  }