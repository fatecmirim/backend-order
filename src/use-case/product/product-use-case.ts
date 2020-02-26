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

  public async getProductById(productId: number): Promise<Product | null> {
    return this.productRepository.getProductById(productId);
  }

  public async getProductByNameIlike(productName: string): Promise<Product[]> {
    return this.productRepository.getProductByNameIlike(productName);
  }

  public async updateProductById(producId: number, params: IParamsProduct): Promise<Product | null> {
    return this.productRepository.updateProductById(producId, params);
  }

  public async verifyProductStock(id: number, quantity: number): Promise<boolean> {
    return this.productRepository.verifyProductStock(id, quantity);
  }

  public async updateStock(productId: number, quantity): Promise<void> {
    return this.productRepository.updateStock(productId, quantity);
  }
}