import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../app/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../app/repositories/user.repository';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private userRepository: UserRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.url.startsWith('/admin/')) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request); // Assuming the token is sent in the Authorization header
    const decodedPayload = this.jwtService.verify(token);

    const username = decodedPayload.username;
    const tokenVersion = decodedPayload.tokenVersion;

    const userModel = await this.userRepository.findByUsername(username);

    // Check if the token version matches the stored version
    if (!userModel || tokenVersion !== userModel.tokenVersion) {
      throw new UnauthorizedException();
      // return false;
    }

    return super.canActivate(context) as boolean;
  }

  // canActivate(context: ExecutionContext) {
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
