import { Injectable } from '@nestjs/common';
import { Prisma, RoomParticipant } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomParticipantsService {
  constructor(private readonly prismaService: PrismaService) { }

  async participant(
    participantWhereUniqueInput: Prisma.RoomParticipantWhereUniqueInput,
  ): Promise<RoomParticipant | null> {
    return this.prismaService.roomParticipant.findUnique({
      where: participantWhereUniqueInput,
      include: {
        user: true,
        room: true,
      },
    });
  }

  async participants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoomParticipantWhereUniqueInput;
    where?: Prisma.RoomParticipantWhereInput;
    orderBy?: Prisma.RoomParticipantOrderByWithRelationInput;
  }): Promise<RoomParticipant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.roomParticipant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
        room: true,
      },
    });
  }

  async create(data: Prisma.RoomParticipantCreateInput): Promise<RoomParticipant> {
    return this.prismaService.roomParticipant.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.RoomParticipantWhereUniqueInput;
    data: Prisma.RoomParticipantUpdateInput;
  }): Promise<RoomParticipant> {
    const { where, data } = params;
    return this.prismaService.roomParticipant.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.RoomParticipantWhereUniqueInput): Promise<RoomParticipant> {
    return this.prismaService.roomParticipant.delete({
      where,
    });
  }
}

