import Order from "../entity/order";
import { OrderDb } from "../models";

export default class OrderRepository {
  constructor() {}
  
  public static returnFromDatabase(row: any) {
    const order: Order = new Order();
    if(row["id"]) {
      order.id = row["id"];
    }
    if(row["customer_id"]) {
      order.customerId = row["customer_id"];
    }
    return order;
  }

  public async createOrder(customerId: number): Promise<Order> {
    const order = new OrderDb({
      customer_id: customerId
    });
    const orderSaved = await order.save();
    console.log(orderSaved);
    
    return OrderRepository.returnFromDatabase(orderSaved);
  }
}