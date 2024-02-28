import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IWebSocketData } from './interface';
import { VehicleDataService } from '../../iot/vehicle_data/vehicle-data.service';
import {VehicleData} from "../../iot/vehicle_data/vehicle-data.model";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly vehicleDataService: VehicleDataService) {
    this.vehicleDataService.iotDataCreatedEvent.on(
      'IoT data created',
      (data: VehicleData) => {
        this.sendToAll('iot_data_created', data);
      },
    );
  }
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.debug(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  sendToClient(clientId: string, event: string, data: any) {
    this.io.to(clientId).emit(event, data);
  }

  sendToAll(event: string, data: any) {
    this.io.emit(event, data);
  }
}
