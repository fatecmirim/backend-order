import { IParamsOrder } from "../../facilities/interfaces/i-order";
import OrderUseCase from "../../use-case/order/order-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";

export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase = new OrderUseCase()
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
  
  private sendServerError(res, error?) {
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}