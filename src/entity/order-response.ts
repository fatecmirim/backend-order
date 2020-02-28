import { ProductResponse } from "./product-response";
export default class OrderResponse {
  constructor() {
    this.products = new Array<ProductResponse>()
  }

  public orderNumber: number;
  public products: ProductResponse[];
  public total: number;
}