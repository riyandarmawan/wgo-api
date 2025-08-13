import { Controller, Post, Req, Body, Param, Delete, Patch } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { Request } from 'express';
import { FriendRequestDto } from './dtos/friend-request.dto';
import { FriendRequestResponseDto } from './dtos/friend-request-response.dto';
import { FriendRequestStatus } from 'generated/prisma';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) { }

  @Post('request')
  async request(
    @Req() req: Request & { user: { id: string; username: string } },
    @Body() friendRequestDto: FriendRequestDto,
  ): Promise<FriendRequestResponseDto> {
    return this.friendRequestsService.createFriendRequest({
      sender: {
        connect: {
          id: req.user.id,
        },
      },
      receiver: {
        connect: {
          id: friendRequestDto.receiverId,
        },
      },
    });
  }

  @Patch('accept/:id')
  async accept(
    @Req() req: Request & { user: { id: string; username: string } },
    @Param('id') id: string,
  ): Promise<FriendRequestResponseDto> {
    return this.friendRequestsService.updateFriendRequest({
      where: {
        AND: [
          {
            id
          },
          {
            receiverId: req.user.id
          }
        ]
      },
      data: {
        status: FriendRequestStatus.ACCEPTED,
      }
    })
  }

  @Delete('delete/:id')
  async delete(
    @Req() req: Request & { user: { id: string; username: string } },
    @Param('id') id: string,
  ) {
    return this.friendRequestsService.deleteFriendRequest({
      id,
      OR: [
        {
          senderId: req.user.id
        },
        {
          receiverId: req.user.id
        },
      ]
    })
  }
}

