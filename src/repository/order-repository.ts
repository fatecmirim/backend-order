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
    if(row["createdAt"]) {
      const date = new Date(row["createdAt"]);
      order.createdAt = `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()} at ${date.getHours()}:${date.getMinutes()}`;    
    }
    return order;
  }

  public async createOrder(customerId: number): Promise<Order> {
    const order = new OrderDb({
      customer_id: customerId
    });
    const orderSaved = await order.save();    
    return OrderRepository.returnFromDatabase(orderSaved);
  }

  public async retrieveOrdersByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await OrderDb.findAll({ where: { customer_id: customerId } });

    if(!orders) return [];

    return orders.map((order) => OrderRepository.returnFromDatabase(order));
  }
}