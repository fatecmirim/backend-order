import { CustomerUseCase } from "../customer/customer-use-case";
import jwt from "jsonwebtoken";
import config from "../../environment/config";
import Crypto from "../../utils/crypto";

export default class LoginUseCase {
  constructor(
    private readonly customerUseCase = new CustomerUseCase(),
    private readonly crypto: Crypto = new Crypto()
  ) {}

  public async login(email: string, password: string): Promise<any> {
    const user = await this.customerUseCase.getCustomerByEmail(email);
    if(!user) throw { message: "Email ou senha incorretos"};
    
    if (this.verifyPassword(password, user)) {
      const token = jwt.sign({ email: user.email, admin: user.admin },
        config.secretKeyToken);
      return { token, admin: user.admin, id: user.id };
    } else {
      throw { message: "Email ou senha incorretos"};
    }
  }

  private verifyPassword(password, user): boolean {
    const passwordFromUser = this.crypto.decrypt(user.password);
    let response = false;
    if(password == passwordFromUser) {
      response = true;
    }
    return response;
  }

}