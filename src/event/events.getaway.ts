import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;
  wsClients = {};

  @SubscribeMessage('chat')
  onEvent(@MessageBody() data): any {
    this.broadcast('chat', data);
  }

  @SubscribeMessage('subscribe')
  onSubscribe(client: any, data: any) {
    try {
      if (Object.keys(this.wsClients).indexOf(data) !== -1) {
        this.wsClients[data].push(client);
      } else {
        this.wsClients[data] = [client];
      }
      return 'Subscribed';
    } catch (e) {
      return 'Event not found';
    }
  }

  handleConnection(client: any, ...args): any {}

  handleDisconnect(client) {
    // for (let i = 0; i < this.wsClients.length; i++) {
    //   if (this.wsClients[i] === client) {
    //     this.wsClients.splice(i, 1);
    //     break;
    //   }
    // }
    // this.broadcast('disconnect',{});
  }

  public broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify({
      message,
    });
    try {
      for (const c of this.wsClients[event]) {
        c.send(broadCastMessage);
      }
    } catch (e) {
      throw new BadRequestException({
        status: -7,
        message: 'Client socket not found',
      });
    }
  }
}
