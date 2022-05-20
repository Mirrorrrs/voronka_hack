import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilService } from '../util/util.service';
import { SignInDto, SignUpDto } from './dto';

export interface IAccessToken {
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

  async login(dto: SignInDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    if (user) {
      const pwMatches = await argon.verify(user.hash, dto.password);
      if (pwMatches) {
        return this.signToken(user.id, user.login.toString());
      } else {
        throw new ForbiddenException('Wrong credentials');
      }
    } else {
      throw new ForbiddenException('Wrong credentials');
    }
  }

  async signup(dto: SignUpDto) {
    const last_user: any = await this.prismaService.user.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    });
    const login = (last_user[0]?.id + 1 || 0) + 1000;
    const password_generated: string =
      this.utilService.generateRandomPassword(10);
    const hash: string = await argon.hash(password_generated);
    try {
      const user = await this.prismaService.user.create({
        data: {
          login: login,
          name: dto.name,
          second_name: dto.second_name,
          surname: dto.surname,
          hash: hash,
        },
      });
      return {
        ...user,
        password: password_generated,
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new BadRequestException('user already exists');
        }
      }
    }
  }

  async signToken(userId: number, login: string): Promise<IAccessToken> {
    const payload = {
      sub: userId,
      login: login,
    };

    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get('JWTSECRET'),
      }),
    };
  }
}
