import { IParamsOrder } from "src/facilities/interfaces/I-order";
import OrderRepository from "../../repository/order-repository";
import ItemUseCase from "../item/item-use-case";
import { ProductUseCase } from "../product/product-use-case";

export default class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase(),
    private readonly productUseCase: ProductUseCase = new ProductUseCase()
  ) {}

  public async saveOrder(params: IParamsOrder): Promise<any> {
    const { customerId, items } = params;
    const order = await this.orderRepository.createOrder(customerId);
    const itemsWithProducts = await this.itemUseCase.getProductsFromItems(items);
    const itemsFullfield = await this.saveItems(order.id, itemsWithProducts);
    await this.removeFromStockTheProductsSold(itemsFullfield);
    return this.makeResponseOrder(order.id, itemsWithProducts);
  }


  private async saveItems(orderId: number, itemsWithProducts): Promise<any> {
    return Promise.all(itemsWithProducts.map((itemWithProduct) => {
      return this.itemUseCase.create(orderId, itemWithProduct);
    }));
  }

  private async removeFromStockTheProductsSold(itemsFullfield): Promise<void> {
    itemsFullfield.map( async (item) => {
      await this.productUseCase.updateStock(item.productId, item.quantity);
    });
  }

  private async makeResponseOrder(orderId:number, itemsWithProducts): Promise<ResponseOrder> {
    
  }
}