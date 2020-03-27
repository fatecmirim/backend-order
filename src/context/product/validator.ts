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
      photoId: Joi.number().positive().integer().required()
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }

  public static validateGetProductByName(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      productName: Joi.string().required()
    });
    Joi.validate({ ...req.query }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }

  public static validateUpdateProductById(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      name: Joi.string(),
      price: Joi.number().positive(),
      kg: Joi.number().positive(),
      stock: Joi.number().positive().integer(),
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }

  public static validateVerifyProductStock(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      id: Joi.number().positive().integer().required(),
      quantity: Joi.number().positive().integer().required()
    });
    Joi.validate({ ...req.query }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }
  
}