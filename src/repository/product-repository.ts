import { IParamsProduct } from "src/facilities/interfaces/i-params-product";
import Product from "../entity/product";
import { ProductDb } from "../models";

export class ProductRepository {
  constructor() {}

  public static returnFromDatabase(row: any) {
    const product: Product = new Product();
    if (row["id"]) {
      product.id = row["id"];
    }
    if (row["name"]) {
      product.name = row["name"];
    }
    if (row["price"]) {
      product.price = row["price"];
    }
    if (row["kg"]) {
      product.kg = row["kg"];
    }
    if (row["stock"]) {
      product.stock = row["stock"];
    }
    return product;
  }

  public async save(params: IParamsProduct): Promise<Product> {
    const {kg, stock, name, price} = params;
    const product = new ProductDb({
      kg: kg.toFixed(2),
      stock,
      name,
      price: price.toFixed(2)
    });
    const productSaved = await product.save();
    return ProductRepository.returnFromDatabase(productSaved);
  }

  public async getAllProduct(): Promise<Product[]> {
    const products = await ProductDb.findAll();
    if(!products.length) return [];
    return products.map((product) => ProductRepository.returnFromDatabase(product));
  }
}