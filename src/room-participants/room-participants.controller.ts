import { Controller } from '@nestjs/common';
import { RoomParticipantsService } from './room-participants.service';

@Controller('room-participants')
export class RoomParticipantsController {
  constructor(private readonly roomParticipantsService: RoomParticipantsService) {}
}
