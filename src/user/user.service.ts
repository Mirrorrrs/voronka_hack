import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { UtilService } from '../util/util.service';
import { EventsGateway } from '../event/events.getaway';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilService,
    private eventGetaway: EventsGateway,
  ) {}

  async setChildren(user_id, dto) {}

  async submitTransaction(dto) {
    const transaction = await this.prismaService.transaction.update({
      where: {
        hash: dto.hash,
      },
      data: {
        status: true,
      },
      include: {
        user: true,
      },
    });

    if (transaction) {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: transaction.user.id,
        },
      });
      await this.prismaService.user.update({
        where: {
          id: transaction.user.id,
        },
        data: {
          balance: user.balance - transaction.value,
        },
      });

      return {
        success: true,
      };
    }

    throw new BadRequestException({
      message: 'wrong transaction',
    });
  }

  async updateBalance(dto) {
    const child = await this.prismaService.user.findUnique({
      where: {
        id: dto.child_id,
      },
    });

    await this.prismaService.user.update({
      where: {
        id: dto.child_id,
      },
      data: {
        balance: child.balance + parseInt(dto.balance),
      },
    });

    return {
      success: true,
    };
  }

  async getAllUsers() {
    return {
      users: await this.prismaService.user.findMany({
        orderBy: {
          role: 'asc',
        },
      }),
    };
  }

  async updateDataStaticUserData(user_id, dto) {
    const user = await this.prismaService.user.findFirst({
      where: { id: user_id },
    });
    if (this.utilService.checkRole(user.role, 'Администратор')) {
      try {
        await this.prismaService.user.update({
          where: {
            id: parseInt(dto.user_id),
          },
          data: {
            camp_member_id: dto.camp_member_id,
            group_member_id: dto.group_member_id,
            role: dto.role,
            name: dto.name,
            login: dto.login,
            ...(dto.password && { hash: await argon.hash(dto.password) }),
          },
        });

        return {
          success: true,
        };
      } catch (e) {
        throw new BadRequestException({
          message: 'wrong data',
        });
      }
    }

    throw new ForbiddenException({
      message: 'wrong role',
    });
  }

  async getMe(user_id) {
    return await this.prismaService.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        group_member: true,
        camp_member: true,
        parent: true,
        diagnozes: true,
        children: {
          include: {
            reviews: {
              where: {
                date: new Date(),
              },
            },
          },
        },
      },
    });
  }

  async getWalletHash(user_id) {
    const wallet_hash = await this.prismaService.user.findFirst({
      where: {
        id: parseInt(user_id),
      },
      select: {
        wallet_hash: true,
      },
    });
    if (wallet_hash.wallet_hash) {
      const hash = await argon.hash(wallet_hash.wallet_hash);
      return {
        wallet_hash: hash,
      };
    }

    throw new ForbiddenException({
      message: 'User is unpayable',
      code: -10,
    });
  }

  async transaction(resiver_id, sender_credentials) {
    if (resiver_id !== sender_credentials.sender_id) {
      const sender_instance = await this.prismaService.user.findFirst({
        where: {
          id: parseInt(sender_credentials.sender_id),
        },
      });
      const hash_verify = await argon.verify(
        sender_credentials.sender_hash,
        sender_instance.wallet_hash,
      );

      if (hash_verify) {
        const new_hash = await argon.hash(
          this.utilService.generateRandomPassword(60),
        );
        await this.prismaService.user.update({
          where: {
            id: parseInt(sender_credentials.sender_id),
          },
          data: {
            wallet_hash: new_hash,
          },
        });
        if (sender_instance.balance > sender_credentials.price) {
          const transaction = await this.prismaService.transaction.create({
            data: {
              hash: await argon.hash(
                this.utilService.generateRandomPassword(60),
              ),
              value: sender_credentials.price,
              user_id: parseInt(sender_credentials.sender_id),
            },
          });
          this.eventGetaway.broadcast(sender_credentials.sender_id, {
            type: 'TRANSACTION_SUBMIT',
            data: transaction.hash,
          });
        } else {
          throw new ForbiddenException({
            message: 'no money',
          });
        }
      } else {
        throw new ForbiddenException({
          message: 'wallet hash expired',
          status: 15,
        });
      }
    } else {
      throw new ForbiddenException({
        message: '1 to 1 transfer!',
        status: 13,
      });
    }
  }
}
