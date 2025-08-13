import { Injectable } from '@nestjs/common';
import { Prisma, Message } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) { }

  async chat(
    chatWhereUniqueInput: Prisma.MessageWhereUniqueInput,
  ): Promise<Message | null> {
    return this.prismaService.message.findUnique({
      where: chatWhereUniqueInput,
    });
  }

  async chats(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput;
  }): Promise<Message[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.message.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prismaService.message.create({
      data,
    });
  }

  async updateChat(params: {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { where, data } = params;
    return this.prismaService.message.update({
      where,
      data,
    });
  }

  async deleteChat(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
    return this.prismaService.message.delete({
      where,
    });
  }
}

