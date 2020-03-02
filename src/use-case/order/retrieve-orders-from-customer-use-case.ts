import OrderRepository from "../../repository/order-repository";
import ItemUseCase from "../item/item-use-case";
import OrderResponse from "../../entity/order-response";
import Order from "../../entity/order";
import { ItemWithProduct } from "../../facilities/interfaces/i-item";
import { ProductResponse } from "../../entity/product-response";
import { ProductsResponseWithTotal } from "../../facilities/interfaces/i-order";

export default class RetrieveOrdersFromCustomerUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase(),
  ) {}

  public async retrieveOrdersByCustomerId(customerId: number): Promise<OrderResponse[]> {
    const ordersFromCustomer = await this.orderRepository.retrieveOrdersByCustomerId(customerId);
    if (!ordersFromCustomer.length) return [];
    const ordersResponse = await this.getEachItemAndProduct(ordersFromCustomer);
    return ordersResponse;
  }

  private async getEachItemAndProduct(ordersFromCustomer: Order[]): Promise<OrderResponse[]> {
    const ordersResponses = Promise.all(ordersFromCustomer.map( async (order) => {
      const orderResponse = new OrderResponse();
      orderResponse.orderNumber = order.id;
      const items = await this.itemUseCase.getAllItemsByOrderId(order.id);
      const itemsWithProducts: ItemWithProduct[] = await this.itemUseCase.getProductsFromItems(items);
      const productsResponseWithTotal = this.makeProductsResponses(itemsWithProducts);
      orderResponse.products.push(...productsResponseWithTotal.productsResponse);
      orderResponse.total = productsResponseWithTotal.total;
      orderResponse.date = order.createdAt;
      return orderResponse;
    }));
    return ordersResponses;
  }

  private makeProductsResponses(itemsWithProducts: ItemWithProduct[]): ProductsResponseWithTotal{
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