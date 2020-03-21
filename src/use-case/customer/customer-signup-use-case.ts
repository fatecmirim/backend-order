import Customer from "../../entity/customer";
import { IParamsCustomer } from "../../facilities/interfaces/i-params-customer";
import CustomerRepository from "../../repository/customer-repository";
import Crypto from "../../utils/crypto";

export class CustomerSignupUseCase {

  constructor (
    private readonly customerRepository: CustomerRepository = new CustomerRepository(),
    private readonly crypto: Crypto = new Crypto()
  ) {}

  public signup(params: IParamsCustomer): Promise<Customer> {
    const { password } = params;
    params.password = this.crypto.crypt(password);
    return this.customerRepository.signup(params);
  }
}