import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { PresenceModule } from 'src/presence/presence.module';

@Module({
  imports: [PresenceModule],
  providers: [MessagesGateway, MessagesService, JwtService, ConfigService, PrismaService]
})
export class MessagesModule { }
