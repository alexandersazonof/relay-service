import { Module } from '@nestjs/common';
import { Web3ManagerModule } from 'src/common/web3-manager/web3-manager.module';
import { Web3Service } from './web3.service';
import { Web3Controller } from './web3.controller';

@Module({
  imports: [Web3ManagerModule],
  controllers: [Web3Controller],
  providers: [Web3Service],
})
export class Web3Module {}
