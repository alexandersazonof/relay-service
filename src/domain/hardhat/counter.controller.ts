import { Controller, Get } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly hardhatService: CounterService) {}

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
