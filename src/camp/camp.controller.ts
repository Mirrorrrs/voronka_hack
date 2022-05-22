import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CampService } from './camp.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt-secure'))
@Controller('camp')
export class CampController {
  constructor(private campService: CampService) {}

  @Get('all_camps')
  getAllCamps() {
    return this.campService.getAllCamps();
  }

  @Post('create_camp')
  createCamp(@Req() req, @Body() dto) {
    return this.campService.createCamp(req.user.user_id,dto);
  }
}
