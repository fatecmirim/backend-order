import { CustomerDb } from "../models";
import { IParamsCustomer } from "../facilities/interfaces/i-params-customer";
import Customer from "../entity/customer";

export default class CustomerRepository {
  constructor() { }

  public static returnFromDatabase(row: any) {
    const customer: Customer = new Customer();

    if(row["id"]) {
      customer.id = row["id"];
    }
    if(row["admin"] != undefined && row["admin"] != null) {      
      customer.admin = row["admin"];
    }
    if(row["password"]) {
      customer.password = row["password"];
    }
    if(row["name"]) {
      customer.name = row["name"];
    }
    if(row["email"]) {
      customer.email = row["email"];
    }
    if(row["phone"]) {
      customer.phone = row["phone"];
    }
   
    return customer;
  }

  public async verifyIfHaveEmail(email: string): Promise<boolean> {
    const customer = await CustomerDb.findOne({ where: { email } });
    if (customer) return true;
    return false;
  }

  public async signup(params: IParamsCustomer): Promise<Customer> {
    const customer = new CustomerDb({
      ...params
    });
    const response = await customer.save();
    return CustomerRepository.returnFromDatabase(response); 
  }

  public async getAllCustomers(): Promise<Customer[]> {
    const customers = await CustomerDb.findAll();
    if (!customers) return []; 
    return customers.map((customer) => CustomerRepository.returnFromDatabase(customer));
  }

  public async getCustomerByEmail(email: string): Promise<Customer | null> {
    const customer = await CustomerDb.findOne({ where: { email } });
    
    if(customer) {  
      return CustomerRepository.returnFromDatabase(customer);
    }
    return null;
  }

  public async updateCustomerById(id: number, params: IParamsCustomer): Promise<Customer | null>{
    const customer = await CustomerDb.findByPk(id);
    if(customer) {
      customer.name = params.name || customer.name;
      customer.password = params.password || customer.password;
      customer.phone = params.phone || customer.phone;
      customer.email = params.email || customer.email;
      const customerUpdated = await customer.save();
      return CustomerRepository.returnFromDatabase(customerUpdated);
    }
    return null;
  }

  public async getCustomerById(id: number): Promise<Customer> {
    const customer = await CustomerDb.findByPk(id);
    return CustomerRepository.returnFromDatabase(customer);
  }
}