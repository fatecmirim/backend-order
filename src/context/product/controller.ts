import { ProductUseCase } from "../../use-case/product/product-use-case";
import { ResponseStatus } from "../../facilities/enums/respose-status";
import Product from "../../entity/product";

export class ProductController {
  constructor(
    private readonly productUseCase: ProductUseCase = new ProductUseCase()
  ) {}

  public async save(req, res, next): Promise<void> {
    try {
      const params: {name, price, kg, stock } = req.body;
      const product = await this.productUseCase.save(params);
      if (product) {
        return res.status(ResponseStatus.CREATED).json({ message: `Created` });
      }
      return this.sendServerError(res);
    } catch (error) {
      return this.sendServerError(res, error);
    }
  }

  public async getAllProduct(req, res, next): Promise<void> {
    try {
      const products = await this.productUseCase.getAllProduct();
      return res.status(ResponseStatus.SUCCESS).json(products);
    } catch (error) {
      return this.sendServerError(res, error);
    }
  }


  private sendServerError(res, error?) {
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}