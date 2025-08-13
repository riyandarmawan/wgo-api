export class FriendRequestResponseDto {
  id: string;

  senderId: string;
  receiverId: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;
}
