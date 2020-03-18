import { CustomerUseCase } from "../customer/customer-use-case";
import jwt from "jsonwebtoken";
import config from "../../environment/config";

export default class LoginUseCase {
  constructor(
    private readonly customerUseCase = new CustomerUseCase()
  ) {}

  public async login(email: string, password: string): Promise<any> {
    const user = await this.customerUseCase.getCustomerByEmail(email);
    if(!user) throw { message: "Email ou senha incorretos"};
    
    if (user.password == password) {
      const token = jwt.sign({ email: user.email, admin: user.admin },
        config.secretKeyToken, { expiresIn: "1h" });
      return { token, admin: user.admin };
    } else {
      throw { message: "Email ou senha incorretos"};
    }
  }

}