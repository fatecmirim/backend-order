import { IParamsOrder } from "../../facilities/interfaces/i-order";
import OrderUseCase from "../../use-case/order/save-order-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";
import RetrieveOrdersFromCustomerUseCase from "../../use-case/order/retrieve-orders-from-customer-use-case";
import RetrieveOrdersToAdmin from "../../use-case/order/retrieve-orders-to-admin";
import Mail from "../../lib/Mail";
import { CustomerUseCase } from "../../use-case/customer/customer-use-case";

export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase = new OrderUseCase(),
    private readonly retrieveOrderFromCustomerUseCase = new RetrieveOrdersFromCustomerUseCase(),
    private readonly retrieveOrdersToAdmin = new RetrieveOrdersToAdmin(),
    private readonly customerUseCase = new CustomerUseCase()
  ) { }

  public async saveOrder(req, res, next): Promise<void> {
    try {
      const params: IParamsOrder = req.body;
      const orderResponse = await this.orderUseCase.saveOrder(params);
      if (orderResponse) return res.status(ResponseStatus.SUCCESS).json(orderResponse);
      this.sendServerError(res);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async retrieveOrdersByCustomerId(req, res, next): Promise<void> {
    try {
      const { customerId } = req.query;
      const ordersFromCustomer = await this.retrieveOrderFromCustomerUseCase.retrieveOrdersByCustomerId(customerId);

      if (!ordersFromCustomer) return res.status(ResponseStatus.NOT_FOUND).json();
      return res.status(ResponseStatus.SUCCESS).json(ordersFromCustomer);
    } catch (error) {
      this.sendServerError(res, error);
    }

  }

  public async retrieveAllOrders(req, res, next): Promise<void> {
    try {
      const orders = await this.retrieveOrdersToAdmin.getAllOrders();
      if (orders) return res.status(ResponseStatus.SUCCESS).json(orders);
      return res.status(ResponseStatus.SUCCESS).json([]);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async acceptOrderFromCustomer(req, res, next): Promise<void> {
    const { id } = req.params;
    try {
      await this.orderUseCase.acceptOrderFromCustomer(id);
      await this.sendEmailToCustomer(id);
      return res.status(ResponseStatus.SUCCESS).json();
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  private async sendEmailToCustomer(orderId: number): Promise<void> {
    const customer = await this.customerUseCase.getCustomerByOrderId(orderId);
    const orders = await this.retrieveOrderFromCustomerUseCase.retrieveOrdersByCustomerId(customer.id);
    console.log("order id", orderId);
    
    const [order] = orders.filter((order) => order.orderNumber == orderId);
    console.log(orders);
    console.log(customer, "-----------");
    console.log("--------",order);
    Mail.sendMail({
      to: `${customer.name} <${customer.email}>`,
      subject: 'Pedido aceito',
      template: 'pedido',
      context: {
        customer,
        order,
      },
    });
  }

  private sendServerError(res, error?) {
    const message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}