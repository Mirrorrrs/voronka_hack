import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt-secure'))
  @Get('wallet_hash')
  getWalletHash(@Req() req) {
    return this.userService.getWalletHash(req.user.user_id);
  }

  @UseGuards(AuthGuard('jwt-secure'))
  @Post('transaction')
  transaction(@Body() dto: TransactionDto, @Req() req) {
    return this.userService.transaction(req.user.user_id, dto);
  }
}
