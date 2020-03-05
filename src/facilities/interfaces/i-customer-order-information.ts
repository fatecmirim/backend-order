import Order from "../../entity/order";
import Customer from "../../entity/customer";

export interface ICustomerOrderInformation {
  order: Order;
  customer: Customer;
}