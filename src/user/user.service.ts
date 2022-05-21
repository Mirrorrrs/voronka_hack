import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { UtilService } from '../util/util.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private utilService: UtilService,
  ) {}

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
          console.log('transfer completed');
        } else {
          console.log('no money');
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
