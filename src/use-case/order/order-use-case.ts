import { IParamsOrder } from "src/facilities/interfaces/i-order";
import OrderRepository from "../../repository/order-repository";
import ItemUseCase from "../item/item-use-case";
import { ProductUseCase } from "../product/product-use-case";
import { IOrderResponse } from "../../facilities/interfaces/i-order-response";
import OrderResponse from "../../entity/order-response";
import { ProductResponse } from "../../entity/product-response";

export default class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase(),
    private readonly productUseCase: ProductUseCase = new ProductUseCase()
  ) {}

  public async saveOrder(params: IParamsOrder): Promise<OrderResponse> {
    const { customerId, items } = params;
    const order = await this.orderRepository.createOrder(customerId);
    const itemsWithProducts = await this.itemUseCase.getProductsFromItems(items);
    
    const itemsFullfield = await this.saveItems(order.id, itemsWithProducts);
    await this.removeFromStockTheProductsSold(itemsFullfield);
    
    return this.makeResponseOrder(order.id, itemsWithProducts);
  }


  private async saveItems(orderId: number, itemsWithProducts): Promise<any> {
    return await Promise.all(itemsWithProducts.map((itemWithProduct) => {
      return this.itemUseCase.create(orderId, itemWithProduct);
    }));
  }

  private async removeFromStockTheProductsSold(itemsFullfield): Promise<void> {
    itemsFullfield.map( async (item) => {
      await this.productUseCase.updateStock(item.productId, item.quantity);
    });
  }

  private async makeResponseOrder(orderId:number, itemsWithProducts): Promise<OrderResponse> {
    const orderResponse: OrderResponse = new OrderResponse();
    let productResponse: ProductResponse = new ProductResponse();
    let total: number = 0;
    itemsWithProducts.forEach(itemWithProduct => {
      productResponse = new ProductResponse();
      productResponse.name = itemWithProduct.product.name;
      productResponse.price = itemWithProduct.product.price;
      productResponse.quantity = itemWithProduct.quantity;
      productResponse.subTotal = (itemWithProduct.quantity * productResponse.price);
      total += productResponse.subTotal;
      orderResponse.products.push({...productResponse});
    });
    orderResponse.orderNumber = orderId;
    orderResponse.total = total;
    return orderResponse;    
  }
}