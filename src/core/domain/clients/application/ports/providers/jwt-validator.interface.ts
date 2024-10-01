export interface JWTValidatorInterface {
  validateToken(token: string): Promise<any>;
}
