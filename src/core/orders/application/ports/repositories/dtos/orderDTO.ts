export interface CreateOrderDTO {
  products: {
    id:string;
    amount:number
  }[];
  client_id: string;
}

export interface UpdateOrderDTO {
  id: string;
  product: string;
  client_id: string;
  status: string;
}
