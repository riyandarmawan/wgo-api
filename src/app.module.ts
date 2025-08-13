import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { PresenceModule } from './presence/presence.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomParticipantsModule } from './room-participants/room-participants.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MessagesModule, FriendRequestsModule, PresenceModule, RoomsModule, RoomParticipantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
