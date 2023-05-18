import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Public } from '../../../app/decorators/public.decorator';

@Controller('admin/login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  // @Post()
  // async login(
  //   @Body() { username, password },
  // ): Promise<{ username: string; password: string }> {
  //   // return { username, password };
  //   return this.authService.login(req.user);
  //   // const result = await this.loginService.login(email, password);
  //
  //   // return { success: !!result.message };
  // }

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() body: Record<string, any>) {
    return this.authService.login(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
