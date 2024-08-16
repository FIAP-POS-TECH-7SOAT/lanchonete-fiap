import { Request, Response, NextFunction } from 'express';
import { JWTCognitoAWSValidator } from '@adapters/drivens/infra/providers/jwt-cognito-aws-validator';


const jwtValidator = new JWTCognitoAWSValidator();

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user ={
      id:null
    };
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await jwtValidator.validateToken(token);
    req.user ={
      id: decodedToken.sub as string
    }; 
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
