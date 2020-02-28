import { IParamsProduct } from "src/facilities/interfaces/i-params-product";
import Product from "../entity/product";
import { ProductDb } from "../models";
import sequelize = require("sequelize");

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

  public async getProductById(productId: number): Promise<Product | null> {
    const product = await ProductDb.findByPk(productId);
    if (!product) return null;
    return ProductRepository.returnFromDatabase(product);
  }

  public async getProductByNameIlike(productName: string): Promise<Product[]> {
    const products = 
    await ProductDb.sequelize?.query(`SELECT * FROM products WHERE NAME ILIKE '%${productName}%';`, { type: sequelize.QueryTypes.SELECT });
    console.log(products);
    
    if (!products) return [];
    return products.map((product) => ProductRepository.returnFromDatabase(product));
  }

  public async updateProductById(productId: number, params: IParamsProduct): Promise<Product | null> {
    const product = await ProductDb.findByPk(productId);
    if(!product) return null;
    product.name = params.name || product.name;
    product.price = params.price || product.price;
    product.stock = params.stock || product.stock;
    product.kg = params.kg || product.kg;

    const productUpdated = await product.save();
    return ProductRepository.returnFromDatabase(productUpdated);
  }

  public async verifyProductStock(id: number, quantity: number): Promise<boolean> {
    const product = await ProductDb.findByPk(id);
    if (!product) return false;
    return product.stock >= quantity;
  }

  public async updateStock(productId: number, quantity: number): Promise<void> {
    const product = await ProductDb.findByPk(productId);
    if (product) {
      (product.stock - quantity) < 0 ? product.stock = 0 : product.stock = (product.stock - quantity);
      await product.save();
    }
  }
}