import LoginUseCase from "../../use-case/login/login-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";


export default class Login {

  constructor(
    private readonly loginUseCase = new LoginUseCase()
  ) {}

  public async login(req, res, next): Promise<void>{
    try {
      const response = await this.loginUseCase.login(req.body.email, req.body.password);
      if(response) {
        return res.json(response);
      }
      return res.status(ResponseStatus.BAD_REQUEST).json({ message: `O email ou senha estão incorretos` });
    } catch (error) {
      return res.status(ResponseStatus.BAD_REQUEST).json(error.message)
    }
  }
  
  
  private sendServerError(res, error?) {
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}