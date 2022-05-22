import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CampService {
  constructor(private prismaService: PrismaService) {}

  async createCamp(user_id, dto) {
    await this.prismaService.camp.create({
      data: {
        admin_id: user_id,
        latitude: dto.latitude,
        longitude: dto.longitude,
        name: dto.name,
      },
    });

    return {
      success: true,
    };
  }

  async getAllCamps() {
    return {
      camps: await this.prismaService.camp.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          admin: true,
        },
      }),
    };
  }
}
