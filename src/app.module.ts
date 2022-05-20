import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UtilModule],
})
export class AppModule {}
