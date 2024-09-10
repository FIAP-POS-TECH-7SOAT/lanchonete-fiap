export interface ProcessPaymentRequest {
  amount: number,
  order_id:string;
  customer:{
    email:string | null;
    doc_number:string | null;
  } | null
  
}
