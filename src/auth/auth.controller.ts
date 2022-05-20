import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, IAccessToken } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInDto): Promise<IAccessToken> {
    return this.authService.login(dto);
  }
}
