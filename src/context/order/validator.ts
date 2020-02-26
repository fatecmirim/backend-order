import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class OrderValidator {

  public static validateSaveOrder(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      customerId: Joi.number().integer().positive().required(),
      items: Joi.array().items(Joi.object().keys({
        productId: Joi.number().integer().positive(),
        quantity: Joi.number().integer().positive()
      })).min(1).required()
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }
}