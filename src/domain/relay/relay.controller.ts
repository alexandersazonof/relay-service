import { Controller, Get, Post, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { RelayService } from './relay.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';

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

  @Post('/call-from-operator')
  @HttpCode(HttpStatus.OK)
  callFromOperator(@Body() callFromOperatorDto: CallFromOperatorDto) {
    return this.relayService.callFromOperator(callFromOperatorDto);
  }

  @Get('/test')
  test() {
    return this.relayService.getHashMessage();
  }

  @Get('/recover')
  async recover(/*@Query('hash') hash: string, @Query('signature') signature: string*/) {
    // console.log('Recover 1');
    // await this.relayService.recover();

    // console.log(
    //   '______________________________________________________________________________________________________________',
    // );

    // console.log('Recover 2');
    return this.relayService.recover2();
  }
}
