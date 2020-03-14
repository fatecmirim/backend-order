import CustomerRepository from "../../repository/customer-repository";
import Customer from "src/entity/customer";

export class CustomerUseCase {

  constructor (
    private readonly customerRepository: CustomerRepository = new CustomerRepository()
  ) {}

  public verifyIfHaveEmail(email: string): Promise<boolean> {
    if(!email) return Promise.resolve(false);
    return this.customerRepository.verifyIfHaveEmail(email);
 }

 public getAllCustomers(): Promise<Customer[]> {
  return this.customerRepository.getAllCustomers();
 }

 public getCustomerByEmail(email: string): Promise<Customer | null> {
  return this.customerRepository.getCustomerByEmail(email);
 }
 
 public updateCustomerById(id: number, params: any): Promise<Customer | null> {
  return this.customerRepository.updateCustomerById(id, params);
 }

 public getCustomerById(id: number): Promise<Customer> {
   return this.customerRepository.getCustomerById(id);
 }
}