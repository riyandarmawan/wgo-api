import { Injectable } from '@nestjs/common';
import { Prisma, Chat } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) { }

  async chat(
    chatWhereUniqueInput: Prisma.ChatWhereUniqueInput,
  ): Promise<Chat | null> {
    return this.prismaService.chat.findUnique({
      where: chatWhereUniqueInput,
    });
  }

  async chats(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChatWhereUniqueInput;
    where?: Prisma.ChatWhereInput;
    orderBy?: Prisma.ChatOrderByWithRelationInput;
  }): Promise<Chat[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.chat.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ChatCreateInput): Promise<Chat> {
    return this.prismaService.chat.create({
      data,
    });
  }

  async updateChat(params: {
    where: Prisma.ChatWhereUniqueInput;
    data: Prisma.ChatUpdateInput;
  }): Promise<Chat> {
    const { where, data } = params;
    return this.prismaService.chat.update({
      where,
      data,
    });
  }

  async deleteChat(where: Prisma.ChatWhereUniqueInput): Promise<Chat> {
    return this.prismaService.chat.delete({
      where,
    });
  }
}

