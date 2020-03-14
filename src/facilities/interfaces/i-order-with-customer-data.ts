import { IOrderResponse } from "./i-order-response";

export interface IOrderWithCustomerData {
  customerName: string;
  customerPhone: string;
  orderResponse: IOrderResponse;
}