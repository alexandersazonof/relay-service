import { Controller, Get } from '@nestjs/common';
import { HardhatService } from './hardhat.service';

@Controller('hardhat')
export class HardhatController {
  constructor(private readonly hardhatService: HardhatService) {}

  @Get('/get')
  async testCounterCall() {
    return this.hardhatService.testCounterCall();
  }

  @Get('/plus')
  async testCounterPlus() {
    return this.hardhatService.testCounterPlus();
  }

  @Get('/reset')
  async testCounterReset() {
    return this.hardhatService.testCounterReset();
  }
}
