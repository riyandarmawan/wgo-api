import { IsNotEmpty, IsString } from "class-validator";

export class FriendRequestDto {
  @IsString()
  @IsNotEmpty()
  receiverId: string
}
