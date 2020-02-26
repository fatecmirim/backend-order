import Product from "../../entity/product";

export interface ItemWithProduct {
  product: Product;
  quantity: number;
}
