import { IParamsOrder } from "../../facilities/interfaces/i-order";
import OrderUseCase from "../../use-case/order/save-order-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";
import RetrieveOrdersFromCustomerUseCase from "../../use-case/order/retrieve-orders-from-customer-use-case";
import RetrieveOrdersToAdmin from "../../use-case/order/retrieve-orders-to-admin";

export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase = new OrderUseCase(),
    private readonly retrieveOrderFromCustomerUseCase = new RetrieveOrdersFromCustomerUseCase(),
    private readonly retrieveOrdersToAdmin = new RetrieveOrdersToAdmin()
  ){}

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
      return res.status(ResponseStatus.SUCCESS).json();
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  private sendServerError(res, error?) {
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}