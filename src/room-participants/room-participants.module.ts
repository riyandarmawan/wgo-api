import { Module } from '@nestjs/common';
import { RoomParticipantsService } from './room-participants.service';
import { RoomParticipantsController } from './room-participants.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoomParticipantsController],
  providers: [RoomParticipantsService, PrismaService],
})
export class RoomParticipantsModule { }
