/**
 * Cannot use, because using guard
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decodedPayload = this.jwtService.verify(token); // Replace 'your_secret_key' with your actual secret key
      const userId = decodedPayload.userId;
      const tokenVersion = decodedPayload.version;

      const user = await this.userRepository.findByUsername(userId);

      // Check if the token version matches the stored version
      if (user && tokenVersion === user.tokenVersion) {
        // Token is valid, proceed with the request
        next();
      } else {
        // Token is invalid or expired
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      // Token verification failed
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}
