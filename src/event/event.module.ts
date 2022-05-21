import { Global, Module } from '@nestjs/common';
import { EventsGateway } from './events.getaway';

@Global()
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway]
})
export class EventModule {}
