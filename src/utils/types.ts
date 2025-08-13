import { Prisma, User } from "generated/prisma";

export type UserPayload = {
  sub: User['id'];
  username: User['username'];
}

export type RoomWithParticipants = Prisma.RoomGetPayload<{
  include: { participants: true };
}>
