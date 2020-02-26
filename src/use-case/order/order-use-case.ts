import { IParamsOrder } from "src/facilities/interfaces/I-order";
import OrderRepository from "../../repository/order-repository";
import ItemUseCase from "../item/item-use-case";

export default class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase()
  ) {}

  public async saveOrder(params: IParamsOrder): Promise<any> {
    const { customerId, items } = params;
    const order = await this.orderRepository.createOrder(customerId);
    const itemsWithProducts = await this.itemUseCase.getProductsFromItems(items);
    const itemsFullfield = itemsWithProducts.map(async (itemWithProduct) => {      
      await this.itemUseCase.create(order.id, itemWithProduct);
    });
    
   
  }
}