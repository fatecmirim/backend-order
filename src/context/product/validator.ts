import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

export class ProductValidator {
  constructor() {}

  public static validateSaveProduct(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      kg: Joi.number().positive().required(),
      stock: Joi.number().positive().integer().required(),
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }
  
}