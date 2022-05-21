import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get('roles')
  getRoles(){
    return this.roleService.getRoles();
  }
}
