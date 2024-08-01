import { Module } from '@nestjs/common';
import { Web3ManagerService } from './web3-manager.service';

@Module({
  providers: [Web3ManagerService],
  exports: [Web3ManagerService],
})
export class Web3ManagerModule {}
