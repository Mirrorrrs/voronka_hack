import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UtilService {
  constructor(private prismaService: PrismaService){}
  generateRandomPassword(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async setRole(current_role, role_id) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id: role_id,
      },
    });

    if (role) {
      return current_role | (1 << role.binary);
    } else {
      throw new NotFoundException('Role not found');
    }
  }

  async checkRole(current_role, role_id) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id: role_id,
      },
    });

    if (role) {
      if ((current_role & (1 << role.binary)) == 1 << role.binary) {
        return true;
      }
      return false;
    } else {
      throw new NotFoundException('Role not found');
    }
  }
}
