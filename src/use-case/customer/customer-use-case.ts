import CustomerRepository from "../../repository/customer-repository";
import Customer from "src/entity/customer";

export class CustomerUseCase {

  constructor (
    private readonly customerRepository: CustomerRepository = new CustomerRepository()
  ) {}

 public customerResponse(customer: Customer) {
    delete customer.password;
    return customer;
  }
  public verifyIfHaveEmail(email: string): Promise<boolean> {
    if(!email) return Promise.resolve(false);
    return this.customerRepository.verifyIfHaveEmail(email);
 }

 public async getAllCustomers(): Promise<Customer[]> {
  const customers = await this.customerRepository.getAllCustomers();
  return customers.map(customer => this.customerResponse(customer));
 }

 public getCustomerByEmail(email: string): Promise<Customer | null> {
  return this.customerRepository.getCustomerByEmail(email);
 }
 
 public async updateCustomerById(id: number, params: any): Promise<Customer | null> {
  const customer = await this.customerRepository.updateCustomerById(id, params);
  return customer ? this.customerResponse(customer) : null;
 }

 public async getCustomerById(id: number): Promise<Customer> {
   const customer = await this.customerRepository.getCustomerById(id);
   return this.customerResponse(customer);
 }

 public getCustomerByOrderId(orderId: number): Promise<Customer> {
   return this.customerRepository.getCustomerByOrderId(orderId);
 }
}