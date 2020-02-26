import { IParamsOrder } from "../../facilities/interfaces/I-order";

export class OrderController {
  constructor(){}

  public async saveOrder(req, res, next): Promise<void> {
    const params: IParamsOrder = req.body;
  }
}