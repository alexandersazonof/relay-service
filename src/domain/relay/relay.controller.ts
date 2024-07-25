import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { ExecuteCallFromOperatorDto } from './dto/execute-call-from-operator.dto';

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

  @Post('/execute-call-from-operator')
  async executeCallFromOperator(@Body() executeCallFromOperatorDto: ExecuteCallFromOperatorDto) {
    return this.relayService.executeCallFromOperatorInQueue(executeCallFromOperatorDto);
  }
}
