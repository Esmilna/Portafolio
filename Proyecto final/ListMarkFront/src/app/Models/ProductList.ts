import { List } from "./List";
import { Product } from "./Product";

export interface ProductList {
    id?: number;
    listNumberId: number;
    productNumberId: number;
    product?: Product;
    list?: List;
}

