import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateStaticData, TransactionDto, SetChildren } from './dto';

@UseGuards(AuthGuard('jwt-secure'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('wallet_hash')
  getWalletHash(@Req() req) {
    return this.userService.getWalletHash(req.user.user_id);
  }

  @Post('transaction')
  transaction(@Body() dto: TransactionDto, @Req() req) {
    return this.userService.transaction(req.user.user_id, dto);
  }

  @Get('get_me')
  getMe(@Req() req) {
    return this.userService.getMe(req.user.user_id);
  }

  @Post('update_static_data')
  updateDataStaticUserData(@Req() req, @Body() dto: UpdateStaticData) {
    return this.userService.updateDataStaticUserData(req.user.user_id, dto);
  }

  @Post('set_children')
  setChildren(@Req() req, @Body() dto: SetChildren) {
    return this.userService.setChildren(req.user.user_id, dto);
  }

  @Get('all_users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('update_balance')
  updateBalance(@Body() dto) {
    return this.userService.updateBalance(dto);
  }

  @Post('submit_transaction')
  submitTransaction(@Body() dto) {
    return this.userService.submitTransaction(dto);
  }
}
