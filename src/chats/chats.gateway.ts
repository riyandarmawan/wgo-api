import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { UserPayload } from 'src/utils/types';
import { ChatsService } from './chats.service';


@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly chatsService: ChatsService,
  ) { }

  private onlineUsers: Map<string, AuthenticatedSocket> = new Map();

  handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
    const token = client.handshake.headers.access_token as string;

    if (!token) {
      client.disconnect();
      return;
    };

    try {
      const secret = this.configService.get<string>('JWT_SECRET_KEY');
      const userPayload: UserPayload = this.jwtService.verify(token, { secret });

      client.data.user = userPayload;
      this.onlineUsers.set(userPayload.sub, client);

      console.log(`${userPayload.username} connected`)
    } catch (error) {
      console.log(`Invalid token: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: AuthenticatedSocket) {
    const user = client.data.user;
    if (!user) return;
    this.onlineUsers.delete(user.sub);
    console.log(`${user.username} disconnected`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() message: string) {
    const userPayload = client.data.user;

    if (!userPayload?.sub) return;

    client.broadcast.emit("receiveMessage", { sender: userPayload.sub, message });

    this.chatsService.create({
      sender: {
        connect: {
          id: userPayload.sub
        }
      },
      message
    })
  }
}
