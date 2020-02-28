export interface IParamsOrder {
  customerId: number;
  items: Item[];
}

export interface Item {
  productId: number;
  quantity: number;
}