import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';

@UseGuards(AuthGuard('jwt-secure'))
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('getGroups')
  getGroups() {
    return this.groupService.getGroups();
  }

  @Get('getGroup')
  getGroup(@Query() query) {
    return this.groupService.getGroup(query.group_id);
  }

  @Post('createGroup')
  createGroup(@Body() dto) {
    return this.groupService.createGroup(dto);
  }
}
