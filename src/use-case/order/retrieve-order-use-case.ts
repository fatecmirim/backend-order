import { ItemWithProduct } from "../../facilities/interfaces/i-item";
import { ProductsResponseWithTotal } from "../../facilities/interfaces/i-order";
import { ProductResponse } from "../../entity/product-response";

export default class RetrieveOrderUseCase {
  constructor() {}

  public makeProductsResponses(itemsWithProducts: ItemWithProduct[]): ProductsResponseWithTotal{
    let productResponse: ProductResponse;
    let total = 0;
    const productsResponse = itemsWithProducts.map((item) => {
      productResponse = new ProductResponse();
      productResponse.name = item.product.name;
      productResponse.price = item.product.price;
      productResponse.quantity = item.quantity;
      productResponse.subTotal = (item.product.price * item.quantity);
      total += productResponse.subTotal;
      return productResponse;
    });
    return { productsResponse, total };
  }
}