
export interface IOrderResponse {
  orderNumber: number;
  products: IProductOrderResponse[];
  total: number;
}


export interface IProductOrderResponse {
  name: string,
  quantity: number;
  price: number;
  subTotal: number;
}