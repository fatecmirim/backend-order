
export interface ResponseOrder {
  orderNumber: number;
  products: IProductResponseOrder[];
  total: number;
}


export interface IProductResponseOrder {
  name: string,
  quantity: number;
  price: number;
  subTotal: number;
}