import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}

  @Post('/call-from-delegator')
  @HttpCode(HttpStatus.OK)
  callFromDelegator(@Body() callFromDelegatorDto: CallFromDelegatorDto) {
    return this.relayService.callFromDelegator(callFromDelegatorDto);
  }

  @Post('/call-from-operator')
  @HttpCode(HttpStatus.OK)
  callFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.callFromOperator(callFromOperatorDto);
  }

  @Post('/user-call-from-operator')
  async userCallFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.userCallFromOperator(callFromOperatorDto);
  }
}
