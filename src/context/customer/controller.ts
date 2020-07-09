import { ResponseStatus } from "../../facilities/enums/respose-status";
import { CustomerSignupUseCase } from "../../use-case/customer/customer-signup-use-case";
import { CustomerUseCase } from "../../use-case/customer/customer-use-case";


export class CustomerController {

  constructor(
    private readonly customerSignupUseCase = new CustomerSignupUseCase(),
    private readonly customerUseCase = new CustomerUseCase()
  ) { }

  public async signup(req, res, next): Promise<void>{
    try {
      const params = req.body;
      const haveAlreadyEmail = await this.customerUseCase.verifyIfHaveEmail(params.email);
      if (haveAlreadyEmail) return res.status(ResponseStatus.CONFLICT).json({ message: `The email ${params.email} already exists` });
      const customer = await this.customerSignupUseCase.signup(params);
      if (customer) {
        return res.status(ResponseStatus.CREATED).json({ message: `Created` });
      }
      this.sendServerError(res);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async getAllCustomers(req, res, next): Promise<void> {
    try {
      const allCustomers = await this.customerUseCase.getAllCustomers();
      if (allCustomers.length) {
        return res.status(ResponseStatus.SUCCESS).json(allCustomers);
      }
      return res.status(ResponseStatus.SUCCESS).json([]);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async getCustomerByEmail(req, res, next): Promise<void> {
    try {
      const { email } = req.query;
      if (!email) return res.status(ResponseStatus.BAD_REQUEST).json("Provide the email");
      const customer = await this.customerUseCase.getCustomerByEmail(email);
      if (customer) {
        return res.status(ResponseStatus.SUCCESS).json(this.customerUseCase.customerResponse(customer));
      }
      return res.status(ResponseStatus.NOT_FOUND).json();
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async getCustomerById(req, res, next): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) return res.status(ResponseStatus.BAD_REQUEST).json("Provide the id");
      const customer = await this.customerUseCase.getCustomerById(id);
      if (customer) {
        return res.status(ResponseStatus.SUCCESS).json(customer);
      }
      return res.status(ResponseStatus.NOT_FOUND).json();
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async updateCustomerById(req, res, next): Promise<void> {
    try {
      const { id } = req.params;
      const params = req.body;
      const haveAlreadyEmail = params.email && await this.customerUseCase.verifyIfHaveEmail(params.email);
      if(haveAlreadyEmail) throw new Error(`The email ${params.email} already exists`);
      if (!id) return res.status(ResponseStatus.BAD_REQUEST).json("Provide the id");
      const customerUpdated = await this.customerUseCase.updateCustomerById(id, params);
      if(customerUpdated) return res.status(ResponseStatus.SUCCESS).json(customerUpdated);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  private sendServerError(res, error?) {
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}