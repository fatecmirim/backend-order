import Customer from "../../entity/customer";
import { IParamsCustomer } from "../../facilities/interfaces/i-params-customer";
import CustomerRepository from "../../repository/customer-repository";

export class CustomerSignupUseCase {

  constructor (
    private readonly customerRepository: CustomerRepository = new CustomerRepository()
  ) {}

  public signup(params: IParamsCustomer): Promise<Customer> {
    const { password } = params;
    return this.customerRepository.signup(params);
  }
}