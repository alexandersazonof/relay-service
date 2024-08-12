import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Get('/error')
  @HttpCode(HttpStatus.OK)
  getContractErrorNameByHex(@Query() getContractErrorNameDto: GetContractErrorNameDto) {
    return this.web3Service.getContractErrorNameByHex(getContractErrorNameDto.code);
  }
}
