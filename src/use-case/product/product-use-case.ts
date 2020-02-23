import { IParamsProduct } from "../../facilities/interfaces/i-params-product";
import Product from "../../entity/product";
import { ProductRepository } from "../../repository/product-repository";

export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository = new ProductRepository()
  ) {}

  public async save(params: IParamsProduct): Promise<Product>{
    return this.productRepository.save(params);
  }

  public async getAllProduct(): Promise<Product[]> {
    return this.productRepository.getAllProduct();
  }
}