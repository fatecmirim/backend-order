import { ResponseStatus } from "../facilities/enums/respose-status";

export const validateAdmin = ((req, res, next) => {
  const user = req.user;
  
  if (!user || !user.email || user.admin == null) {
    return res.status(ResponseStatus.UNAUTHORIZED).json("Just admin allowed ");
  }

  if (!user.admin) {
    return res.status(ResponseStatus.UNAUTHORIZED).json("Just admin allowed ");
  }

  return next();
});