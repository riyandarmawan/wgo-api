import { Test, TestingModule } from '@nestjs/testing';
import { RoomParticipantsController } from './room-participants.controller';
import { RoomParticipantsService } from './room-participants.service';

describe('RoomParticipantsController', () => {
  let controller: RoomParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomParticipantsController],
      providers: [RoomParticipantsService],
    }).compile();

    controller = module.get<RoomParticipantsController>(RoomParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
