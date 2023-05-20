import { Body, Controller, Post, Request, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../../app/decorators/public.decorator';
import LoginDto from './dtos/login.dto';

@Controller('admin/login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Public()
  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
