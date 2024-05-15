export interface CreateOrderDTO {
  products: string;
  client: string;
}

export interface UpdateOrderDTO {
  id: string;
  products: string;
  client: string;
  status: string;
}
