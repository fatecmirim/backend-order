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

  public async getProductById(req, res, next): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) return res.status(ResponseStatus.BAD_REQUEST).json();
      const product = await this.productUseCase.getProductById(id);
      if (!product) return res.status(ResponseStatus.NOT_FOUND).json();
      return res.status(ResponseStatus.SUCCESS).json(product);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async getProductByNameIlike(req, res, next): Promise<void> {
    try {
      const { productName } = req.query;
      const products = await this.productUseCase.getProductByNameIlike(productName);
      return res.status(ResponseStatus.SUCCESS).json(products);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  public async updateProductById(req, res, next): Promise<void> {
    try {
      const { id } = req.params;
      const params = req.body;
      const product = await this.productUseCase.updateProductById(id, params);
      if(!product) this.sendServerError(res);
      return res.status(ResponseStatus.SUCCESS).json(product);
    } catch (error) {
      this.sendServerError(res, error);
    }
  }

  private sendServerError(res, error?): void{
    let message = error.message || { message: `Something went wrong` };
    return res.status(ResponseStatus.SERVER_ERROR).json(message);
  }
}