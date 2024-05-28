export interface ProcessPaymentRequest {
  amount: number,
  card:{
    number: string, 
    exp: string, 
    cvc: number
  }
  
}
