import { IParamsOrder } from "src/facilities/interfaces/i-order";
import OrderRepository from "../../repository/order-repository";
import ItemUseCase from "../item/item-use-case";
import { ProductUseCase } from "../product/product-use-case";
import OrderResponse from "../../entity/order-response";
import { ProductResponse } from "../../entity/product-response";
import { ItemWithProduct } from "../../facilities/interfaces/i-item";

export default class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase(),
    private readonly productUseCase: ProductUseCase = new ProductUseCase()
  ) {}

  public async saveOrder(params: IParamsOrder): Promise<any> {
    const { customerId, items } = params;
    const isThereStockToAllProducts = await this.verifyIfExistStockToAllProducts(items);
    
    if (!isThereStockToAllProducts) {
      throw { message:`Some of the products in the list there no stock available` };
    }
    const order = await this.orderRepository.createOrder(customerId);
    const itemsWithProducts = await this.itemUseCase.getProductsFromItems(items);
    
    const itemsFullfield = await this.saveItems(order.id, itemsWithProducts);
    await this.removeFromStockTheProductsSold(itemsFullfield);
    
    return this.makeResponseOrder(order.id, itemsWithProducts, order.createdAt);
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

  private async makeResponseOrder(orderId: number, itemsWithProducts: ItemWithProduct[], orderDate: string): Promise<OrderResponse> {
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
    orderResponse.date = orderDate;
    orderResponse.orderNumber = orderId;
    orderResponse.total = total;
    console.log(orderResponse);

    return orderResponse;
  }

  public acceptOrderFromCustomer(id: number): Promise<void> {
    return this.orderRepository.acceptOrderFromCustomer(id);
  }

  private async verifyIfExistStockToAllProducts(items: any): Promise<boolean> {
    let response = true;
    const resultBooleand = await Promise.all(items.map(async (item) => {
      let itemHasStock = await this.productUseCase.verifyProductStock(item.productId, item.quantity);
      return itemHasStock;
    }));
    resultBooleand.forEach((result) => {
      if (!result) response = false;
    });
    return response;
  }
}