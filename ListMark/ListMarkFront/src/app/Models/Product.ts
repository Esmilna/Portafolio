import { Brand } from "./Brand";
import { Category } from "./Category";

export interface  Product {
  id?: number;
  name: string;
  description: string;
  brandId: number;
  categoryId: number;
  image: string;
  //category?: Category;
  //brand?: Brand;
}
