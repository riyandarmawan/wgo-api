import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { UserPayload } from 'src/utils/types';
import { MessagesService } from './messages.service';
import { PresenceService } from 'src/presence/presence.service';


@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly messagesService: MessagesService,
    private readonly presenceService: PresenceService,
  ) { }

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
      this.presenceService.setUserSocket(userPayload.sub, client);

      console.log(`${userPayload.username} connected`)
    } catch (error) {
      console.log(`Invalid token: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: AuthenticatedSocket) {
    const user = client.data.user;
    if (!user) return;
    this.presenceService.removeUserSocket(user.sub);
    console.log(`${user.username} disconnected`);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() content: string) {
    const userPayload = client.data.user;

    if (!userPayload?.sub) return;

    client.broadcast.emit("receiveMessage", { sender: userPayload.sub, content });

    // this.messagesService.create({
    //   sender: {
    //     connect: {
    //       id: userPayload.sub
    //     }
    //   },
    //   content
    // })
  }
}
