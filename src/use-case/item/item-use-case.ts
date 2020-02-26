import { Item } from "../../facilities/interfaces/I-order";
import { ProductUseCase } from "../product/product-use-case";
import ItemRepository from "../../repository/item-repository";
import { ItemWithProduct } from "../../facilities/interfaces/i-item";

export default class ItemUseCase {
  constructor(
    private readonly productUseCase: ProductUseCase = new ProductUseCase(),
    private readonly itemRepository: ItemRepository = new ItemRepository()
  ) {}

  public async getProductsFromItems(items: Item[]): Promise<ItemWithProduct[]> {
    const itemsWithProduct = items.map(async (item) => {
      const product = await this.productUseCase.getProductById(item.productId);
      return { product, quantity: item.quantity} as ItemWithProduct;     
    });
    if(!itemsWithProduct) return [];    
    return Promise.all(itemsWithProduct);
  }

  public async create(orderId: number, itemWithProduct): Promise<any> {
    return this.itemRepository.create(orderId, itemWithProduct);
  }
}