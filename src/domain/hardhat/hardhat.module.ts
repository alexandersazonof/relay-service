import { Module } from '@nestjs/common';
import { Web3Module } from 'src/domain/web3/web3.module';
import { HardhatController } from './hardhat.controller';
import { HardhatService } from './hardhat.service';

@Module({
  imports: [Web3Module],
  controllers: [HardhatController],
  providers: [HardhatService],
})
export class HardhatModule {}
