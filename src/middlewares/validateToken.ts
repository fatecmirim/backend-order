import { Request, Response, NextFunction } from "express";
import { ResponseStatus } from "../facilities/enums/respose-status";
import jwt from "jsonwebtoken";
import config from "../environment/config";

export const validateToken = ((req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token);
  
  const [bearer, userToken] = token?.split(' ') || [];
  console.log(bearer);
  console.log(userToken);

  
  if (!token || bearer != "Bearer") {
    return res.status(ResponseStatus.UNAUTHORIZED).json("Token not provided ");
  }
  jwt.verify(userToken, config.secretKeyToken, function (err, decoded) {
    if (err) {
      return res.status(ResponseStatus.UNAUTHORIZED).json("Token not provided ");
    }
    console.log(decoded);
    return next();
  });
});