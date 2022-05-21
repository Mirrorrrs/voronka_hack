import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AuthGuard } from '@nestjs/passport';
import { makeAlert } from './dto';

@UseGuards(AuthGuard('jwt-secure'))
@Controller('alert')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post('make')
  makeAlert(@Req() req, @Body() dto: makeAlert) {
    return this.alertService.makeAlert(req.user.user_id, dto);
  }

  @Get('group_alerts')
  getGroupAlerts(@Req() req) {
    return this.alertService.getGroupAlerts(req.user.user_id);
  }
}
