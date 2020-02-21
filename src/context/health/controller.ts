

export class HealthController {
  constructor() {

  }

  public success(req, res, next) {
   return res.send("success, it's running");
  }

}