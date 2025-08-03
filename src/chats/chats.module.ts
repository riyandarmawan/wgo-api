import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatsService } from './chats.service';

@Module({
  providers: [ChatsGateway, JwtService, ConfigService, PrismaService, ChatsService]
})
export class ChatsModule { }
