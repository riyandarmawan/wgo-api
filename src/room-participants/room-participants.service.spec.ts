import { Test, TestingModule } from '@nestjs/testing';
import { RoomParticipantsService } from './room-participants.service';

describe('RoomParticipantsService', () => {
  let service: RoomParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomParticipantsService],
    }).compile();

    service = module.get<RoomParticipantsService>(RoomParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
