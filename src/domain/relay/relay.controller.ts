import { Controller, Get, Post, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { GetUserNonceDto } from './dto/get-user-nonce.dto';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}

  @Get()
  getContractAddress() {
    return this.relayService.contractAddress;
  }

  @Post('/call-from-delegator')
  @HttpCode(HttpStatus.OK)
  callFromDelegator(@Body() callFromDelegatorDto: CallFromDelegatorDto) {
    return this.relayService.callFromDelegator(callFromDelegatorDto);
  }

  @Post('/call-from-operator')
  @HttpCode(HttpStatus.OK)
  callFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.executeCallFromOperatorInQueue(callFromOperatorDto);
  }

  @Get('/user-nonce')
  async getUserNonce(@Query() getUserNonceDto: GetUserNonceDto) {
    return this.relayService.getUserNonce(getUserNonceDto.address);
  }

  @Get('/erc2771-typehash')
  async getERC2771TypeHash() {
    return this.relayService.CALL_ERC2771_TYPEHASH();
  }

  @Get('/domain-separator')
  async getDomainSeparator() {
    return this.relayService.DOMAIN_SEPARATOR();
  }
}
