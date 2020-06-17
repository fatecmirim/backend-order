import RetrieveOrderUseCase from "./retrieve-order-use-case";
import OrderRepository from "../../repository/order-repository";
import  Order from "../../entity/order";
import { CustomerUseCase } from "../customer/customer-use-case";
import { ICustomerOrderInformation } from "../../facilities/interfaces/i-customer-order-information";
import ItemUseCase from "../item/item-use-case";
import { IOrderWithCustomerData } from "../../facilities/interfaces/i-order-with-customer-data";
import CustomerOrderInformation from "../../entity/customer-order-information";
import OrderResponse from "../../entity/order-response";

export default class RetrieveOrdersToAdmin extends RetrieveOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly customerUseCase: CustomerUseCase = new CustomerUseCase(),
    private readonly itemUseCase: ItemUseCase = new ItemUseCase()
  ) {
    super();
  }


  public async getAllOrders(): Promise<any> {
    const orders: Order[] = await this.orderRepository.retrieveAllOrders();
    const ordersWithCustomerInformation = await Promise.all(orders.map( async (order) => {
     const customer = await this.customerUseCase.getCustomerById(order.customerId);
      return { customer, order};
    }));
    return this.mountResponseWithCustomerInformation(ordersWithCustomerInformation);
  }

  private async mountResponseWithCustomerInformation(ordersWithCustomerInformation: ICustomerOrderInformation[]): Promise<IOrderWithCustomerData[]> {
    return Promise.all(ordersWithCustomerInformation.map(async (orderWithCustomer) => {
      let customerOrderInformation = new CustomerOrderInformation();
      let orderResponse = new OrderResponse();
      customerOrderInformation.customerName = orderWithCustomer.customer.name;
      customerOrderInformation.customerPhone = orderWithCustomer.customer.phone;
      const items = await this.itemUseCase.getAllItemsByOrderId(orderWithCustomer.order.id);      
      const itemsWithProduct = await this.itemUseCase.getProductsFromItems(items);
      const productsResponsesWithTotal = await super.makeProductsResponses(itemsWithProduct);
      orderResponse.date = orderWithCustomer.order.createdAt;
      orderResponse.orderNumber = orderWithCustomer.order.id;
      orderResponse.products = productsResponsesWithTotal.productsResponse;
      orderResponse.total = productsResponsesWithTotal.total;
      orderResponse.accepted = orderWithCustomer.order.accepted;
      customerOrderInformation.orderResponse = orderResponse;
      return customerOrderInformation;
    }));
  }
}