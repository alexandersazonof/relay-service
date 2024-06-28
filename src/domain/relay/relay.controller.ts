import { Controller, Get, Post, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}

  @Get('/error')
  @HttpCode(HttpStatus.OK)
  getContractErrorNameByHex(@Query() getContractErrorNameDto: GetContractErrorNameDto) {
    return this.relayService.getContractErrorNameByHex(getContractErrorNameDto);
  }

  @Post('/call-from-delegator')
  @HttpCode(HttpStatus.OK)
  callFromDelegator(@Body() callFromDelegatorDto: CallFromDelegatorDto) {
    return this.relayService.callFromDelegator(callFromDelegatorDto);
  }
}
