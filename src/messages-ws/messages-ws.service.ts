import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async registerClients(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('usuario no encontrado');
    if (!user.isActive) throw new Error ('usuario no activo');
    //console.log('client del servicio', client)
    this.connectedClients[client.id] = {
      socket: client,
      user: user,
    };
    console.log('conectedClients', this.connectedClients);
  }
  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }
  getConnectClients(): string[] {
    return Object.keys(this.connectedClients);
  }
  getUserFullName(socketId: string){
    return this.connectedClients[socketId].user.fullName;
  }
}
