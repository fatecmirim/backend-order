import { ProductResponse } from "src/entity/product-response";

export interface IParamsOrder {
  customerId: number;
  items: Item[];
}

export interface Item {
  productId: number;
  quantity: number;
}

export interface ProductsResponseWithTotal {
  productsResponse: ProductResponse[];
  total: number;
}