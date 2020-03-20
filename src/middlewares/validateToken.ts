import { ResponseStatus } from "../facilities/enums/respose-status";
import jwt from "jsonwebtoken";
import config from "../environment/config";

export const validateToken = ((req, res, next) => {
  const token = req.headers.authorization;
  
  const [bearer, userToken] = token?.split(' ') || [];
  
  if (!token || bearer != "Bearer") {
    return res.status(ResponseStatus.UNAUTHORIZED).json("Token not provided ");
  }
  jwt.verify(userToken, config.secretKeyToken, function (err, decoded) {
    if (err) {
      return res.status(ResponseStatus.UNAUTHORIZED).json("Token not provided ");
    }
    req.user = { email: decoded.email, admin: decoded.admin };
    return next();
  });
});