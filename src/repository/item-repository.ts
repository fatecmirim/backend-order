import { ItemDb } from "../models";
import Product from "../entity/product";
import Item from "../entity/item";

export default class ItemRepository {
  constructor() {}

  public static returnFromDatabase(row: any) {
    const item: Item = new Item();
    if(row["id"]) {
      item.id = row["id"];
    }
    if(row["order_id"]) {
      item.orderId = row["order_id"];
    }
    if(row["product_id"]) {
      item.productId = row["product_id"];
    }
    if(row["quantity"]) {
      item.quantity = row["quantity"];
    }
    if(row["sub_total"]) {
      item.subTotal = row["sub_total"];
    }
    return item;
  }


  public async create(orderId: number, itemWithProduct): Promise<Item> {
    const { quantity, product } = itemWithProduct;
    console.log(product);
    const item = new ItemDb({
      order_id: orderId,
      product_id: product.id,
      quantity,
      sub_total: (quantity * product.price)
    });
    if(product.stock >= quantity){
      const itemSaved = await item.save();
      return ItemRepository.returnFromDatabase(itemSaved);
    }
    throw {message:`Quantity is bigger than product stock`};
  }

  public async getAllItemsByOrderId(orderId: number): Promise<Item[]> {
    const items = await ItemDb.findAll({ where: { order_id: orderId } });
    if (!items) return [];
    return items.map((item) => ItemRepository.returnFromDatabase(item)); 
  }
}