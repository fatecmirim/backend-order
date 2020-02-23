import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

export class CustomerValidator {
  constructor() { }

  public static validateSignUp(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }

  public static validateUpdate(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      phone: Joi.string(),
    });
    Joi.validate({ ...req.body }, schema, (err) => {
      if (err) return next(err);
      return next();
    });
  }
}