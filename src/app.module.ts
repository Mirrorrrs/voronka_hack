import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
