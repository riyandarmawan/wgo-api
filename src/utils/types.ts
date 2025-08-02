import { User } from "generated/prisma";

export type UserPayload = {
  sub: User['id'];
  username: User['username'];
}
