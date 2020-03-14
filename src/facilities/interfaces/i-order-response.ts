
export interface IOrderResponse {
  orderNumber: number;
  products: IProductOrderResponse[];
  total: number;
  date: string;
}


export interface IProductOrderResponse {
  name: string,
  quantity: number;
  price: number;
  subTotal: number;
}