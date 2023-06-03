import { Controller, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('logout')
export class LogoutController {
  constructor(private authService: AuthService) {}

  @Delete()
  logout(@Request() req) {
    return this.authService.logout(req.user.username).then(() => {
      return { message: 'logged out' };
    });
  }
}
