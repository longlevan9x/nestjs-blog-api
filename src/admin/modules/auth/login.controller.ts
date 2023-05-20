import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../../app/decorators/public.decorator';
import LoginDto from './dtos/login.dto';

@Controller('admin/login')
export class LoginController {
  constructor(private authService: AuthService) {}

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
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
