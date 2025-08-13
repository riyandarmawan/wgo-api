import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interfaces';

@Injectable()
export class PresenceService {
  private userSockets: Map<string, AuthenticatedSocket> = new Map();

  setUserSocket(userId: string, socket: AuthenticatedSocket) {
    this.userSockets.set(userId, socket);
  }

  removeUserSocket(userId: string) {
    this.userSockets.delete(userId);
  }

  getUserSocket(userId: string): AuthenticatedSocket | undefined {
    return this.userSockets.get(userId);
  }

  getAllUserSockets(): Map<string, AuthenticatedSocket> {
    return this.userSockets;
  }
}
