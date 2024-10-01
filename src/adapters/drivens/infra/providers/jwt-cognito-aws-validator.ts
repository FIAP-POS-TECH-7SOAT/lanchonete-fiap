import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import { JWTValidatorInterface } from '@application/domain/clients/application/ports/providers/jwt-validator.interface';
import { env } from '@adapters/drivens/infra/env';

export class JWTCognitoAWSValidator implements JWTValidatorInterface {
  private client;

  constructor() {
    this.client = jwksClient({
      jwksUri: env.AWS_COGNITO_JWKS_URL,
    });
  }

  private async getKey(header: jwt.JwtHeader): Promise<string> {
    const key = await this.client.getSigningKey(header.kid!);
    return key.getPublicKey();
  }

  public async validateToken(token: string): Promise<JwtPayload | string> {
    try {
      const decoded = await new Promise<JwtPayload | string>(
        (resolve, reject) => {
          jwt.verify(
            token,
            async (header, callback) => {
              try {
                const signingKey = await this.getKey(header as jwt.JwtHeader);
                callback(null, signingKey);
              } catch (error: any) {
                callback(error, undefined);
              }
            },
            {
              algorithms: ['RS256'],
              audience: env.AWS_COGNITO_CLIENT_ID,
              issuer: env.AWS_COGNITO_ISSUER_URL,
            },
            (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded as JwtPayload);
              }
            },
          );
        },
      );

      return decoded;
    } catch (error: any) {
      throw new Error(`Token validation failed: ${error.message}`);
    }
  }
}
