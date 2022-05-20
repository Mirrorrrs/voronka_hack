import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto) {
    return this.authService.login(dto);
  }
}
