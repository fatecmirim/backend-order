import Order from "../entity/order";
import { OrderDb } from "../models";
import { Op } from "sequelize";

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
      const date: Date = row["createdAt"];
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      order.createdAt = `${day}/${month}/${year}`;
    }
     order.accepted = row["accepted"];
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

  public async retrieveAllOrders(): Promise<Order[]> {
    const orders = await OrderDb.findAll();
    if(!orders) return [];
    return orders.map((order) => OrderRepository.returnFromDatabase(order));
  }

  public async acceptOrderFromCustomer(id: number): Promise<void> {
    const order = await OrderDb.findByPk(id);
    if(!order) {
      throw new Error("Fail updating the order status");
    }
    order.accepted = true;
    await order.save();
  }

}