import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, FriendRequest, FriendRequestStatus, RoomType } from 'generated/prisma';
import { PresenceService } from 'src/presence/presence.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendRequestsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
    private readonly prismaService: PrismaService,
    private readonly presenceService: PresenceService,
  ) { }

  async friendRequest(
    where: Prisma.FriendRequestWhereUniqueInput,
  ): Promise<FriendRequest | null> {
    return this.prismaService.friendRequest.findUnique({ where });
  }

  async friendRequests(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FriendRequestWhereUniqueInput;
    where?: Prisma.FriendRequestWhereInput;
    orderBy?: Prisma.FriendRequestOrderByWithRelationInput;
  }): Promise<FriendRequest[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.friendRequest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,

    });
  }

  async createFriendRequest(data: Prisma.FriendRequestCreateInput): Promise<FriendRequest> {
    const senderId = data.sender.connect?.id;
    const receiverId = data.receiver.connect?.id;

    // 1. Check if request already exists (in either direction)
    const existingRequest = await this.prismaService.friendRequest.findFirst({
      where: {
        OR: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request already exists between these users');
    }

    // 2. Create new friend request
    const result = await this.prismaService.friendRequest.create({
      data: {
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
        status: FriendRequestStatus.PENDING,
      },
    });

    const sender = await this.usersService.user({ id: result.senderId });

    // 3. Notify receiver via socket if online
    const receiverSocket = this.presenceService.getUserSocket(receiverId!);
    if (receiverSocket && sender) {
      receiverSocket.emit('friendRequestReceived', {
        senderId,
        senderName: sender.name,
        senderUsername: sender.username,
      });
    }

    // 4. Return response
    return result;
  }


  async updateFriendRequest(params: {
    where: Prisma.FriendRequestWhereInput;
    data: Prisma.FriendRequestUpdateInput;
  }): Promise<FriendRequest> {
    const { where, data } = params;

    const existingRequest = await this.prismaService.friendRequest.findFirst({ where });

    if (!existingRequest) {
      throw new BadRequestException("Friend request doesn't exists");
    }

    if (existingRequest.status === FriendRequestStatus.ACCEPTED) {
      throw new BadRequestException("Friend request already accepted!");
    };

    const result = await this.prismaService.friendRequest.update({
      where: {
        id: existingRequest.id
      },
      data,
    });

    const rooms = await this.roomsService.rooms({
      where: {
        type: RoomType.PRIVATE,
        participants: {
          some: {
            userId: result.senderId
          }
        },
        AND: {
          participants: {
            some: {
              userId: result.receiverId
            }
          }
        }
      },
      take: 1
    });


    const existingRoom = rooms[0];

    if (!existingRoom || existingRoom.participants.length !== 2) {
      await this.roomsService.create({
        type: RoomType.PRIVATE,
        participants: {
          create: [
            {
              user: {
                connect: {
                  id: result.senderId
                }
              }
            },
            {
              user: {
                connect: {
                  id: result.receiverId
                }
              }
            },
          ]
        }
      })
    }

    const receiver = await this.usersService.user({
      id: existingRequest.receiverId
    });

    const senderSocket = this.presenceService.getUserSocket(result.senderId);
    if (senderSocket && receiver) {
      senderSocket.emit('friendRequestAccepted', {
        receiverId: receiver.id,
        receiverName: receiver.name,
        receiverUsername: receiver.username,
      });
    }

    return result;
  }

  async deleteFriendRequest(
    where: Prisma.FriendRequestWhereInput,
  ): Promise<FriendRequest> {
    const existingFriend = await this.prismaService.friendRequest.findFirst({
      where,
    });

    if (!existingFriend)
      throw new BadRequestException("The friend request doesn't exist");

    return this.prismaService.friendRequest.delete({
      where: {
        id: existingFriend.id,
      }
    })
  }
}

