import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../../app/decorators/public.decorator';
import LoginDto from './dtos/login.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Public()
  // @UseGuards(AuthGuard('local'))
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
