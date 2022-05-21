import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prismaService: PrismaService) {}

  async getGroupAlerts(user_id) {
    const alerts = await this.prismaService.groupAlert.findMany({
      where: {
        group: {
          members: {
            some: {
              id: user_id,
            },
          },
        },
      },
    });

    if (alerts.length != 0) return { alerts: alerts };
    throw new NotFoundException('No alerts');
  }

  async makeAlert(user_id, dto) {
    const message = dto.message;
    const user = await this.prismaService.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        group_leader: true,
      },
    });
    if (user.group_leader) {
      await this.prismaService.groupAlert.create({
        data: {
          group_id: user.group_leader.id,
          message: message,
        },
      });
      return 'Created';
    } else {
      throw new BadRequestException();
    }
  }
}
