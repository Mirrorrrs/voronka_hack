import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}

  async getGroups() {
    return {
      groups: await this.prismaService.group.findMany({
        include: {
          leader: true,
          members: true,
        },
      }),
    };
  }

  async createGroup(dto) {
    const camp_id = (await this.prismaService.camp.findFirst()).id;
    const group = await this.prismaService.group.create({
      data: {
        name: dto.name,
        camp_id: camp_id,
      },
    });

    return {
      success: true,
    };
  }

  async getGroup(group_id) {
    const group = await this.prismaService.group.findUnique({
      where: {
        id: parseInt(group_id),
      },
    });

    return {
      group,
    };
  }
}
