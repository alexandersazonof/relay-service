import { Controller, Get } from '@nestjs/common';
import { TestRelayService } from './test-relay.service';

@Controller('test-relay')
export class TestRelayController {
  constructor(private readonly hardhatService: TestRelayService) {}

  @Get('/operators')
  async getAllOperators() {
    return this.hardhatService.getAllOperators();
  }
}
