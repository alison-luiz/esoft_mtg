import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class DeckUpdatesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: any) {
      console.log('Client connected:', client.id);
    }
  
    handleDisconnect(client: any) {
      console.log('Client disconnected:', client.id);
    }
  
    sendDeckUpdate(message: any) {
      this.server.emit('deckUpdate', message);
    }
  }
  