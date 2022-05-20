import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilService } from '../util/util.service';

interface IAccessToken {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
    private utilService: UtilService,
  ) {}

  async login(dto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      const pwMatches = await argon.verify(user.hash, dto.password);
      if (pwMatches) {
        return this.signToken(user.id, user.email);
      }
    } else {
      throw new ForbiddenException('wrong credentials');
    }
  }

  async signup(dto) {
    const login =
      this.prismaService.user.findMany({
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
        },
      })[0].id + 1000;
    const hash: string = await argon.hash(
      this.utilService.generateRandomPassword(10),
    );
    try {
      const user = await this.prismaService.user.create({
        data: {
          login,
          hash,
        },
        select: {
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new BadRequestException('user already exists');
        }
      }
    }
  }

  async signToken(userId: number, email: string): Promise<IAccessToken> {
    const payload = {
      sub: userId,
      email: email,
    };

    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get('JWTSECRET'),
      }),
    };
  }
}
