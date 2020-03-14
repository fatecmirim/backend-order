import { IOrderWithCustomerData } from "../facilities/interfaces/i-order-with-customer-data";
import { IOrderResponse } from "../facilities/interfaces/i-order-response";
import OrderResponse from "./order-response";

export default class CustomerOrderInformation implements IOrderWithCustomerData {
  
  public customerName: string;
  public customerPhone: string;
  public orderResponse: IOrderResponse
  
  constructor() {
    this.orderResponse = new OrderResponse();
  }
}