import { Injectable } from '@nestjs/common';
import { Prisma, Room } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomWithParticipants } from 'src/utils/types';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) { }

  async room(
    roomWhereUniqueInput: Prisma.RoomWhereUniqueInput,
  ): Promise<Room | null> {
    return this.prismaService.room.findUnique({
      where: roomWhereUniqueInput,
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  async rooms(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoomWhereUniqueInput;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput;
  }): Promise<RoomWithParticipants[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.room.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        participants: true,
      },
    });
  }

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    return this.prismaService.room.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.RoomWhereUniqueInput;
    data: Prisma.RoomUpdateInput;
  }): Promise<Room> {
    const { where, data } = params;
    return this.prismaService.room.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
    return this.prismaService.room.delete({
      where,
    });
  }
}

