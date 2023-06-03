import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dtos/register.dto';
import { Public } from '../../../app/decorators/public.decorator';

@Controller('register')
export class RegisterController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
