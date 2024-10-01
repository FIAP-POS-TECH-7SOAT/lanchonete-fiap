import { Request, Response, NextFunction } from 'express';
import { JWTCognitoAWSValidator } from '@adapters/drivens/infra/providers/jwt-cognito-aws-validator';

const jwtValidator = new JWTCognitoAWSValidator();

interface DecodedToken {
  sub: string;
  username?: string;
  email?: string;
  cpf?: string;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = (await jwtValidator.validateToken(
      token,
    )) as DecodedToken;
    req.user = {
      id: decodedToken.sub as string,
      name: decodedToken.username as string,
      email: decodedToken.email as string,
      cpf: decodedToken.cpf as string,
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
