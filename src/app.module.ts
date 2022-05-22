import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ReviewModule } from './review/review.module';
import { GroupModule } from './group/group.module';
import { CampModule } from './camp/camp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilModule,
    AuthModule,
    PrismaModule,
    RoleModule,
    EventModule,
    UserModule,
    AlertModule,
    ScheduleModule,
    ReviewModule,
    GroupModule,
    CampModule,
  ],
})
export class AppModule {}
