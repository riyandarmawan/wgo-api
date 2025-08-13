import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PresenceModule } from 'src/presence/presence.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PresenceModule, RoomsModule],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService, UsersService, PrismaService],
})
export class FriendRequestsModule { }
