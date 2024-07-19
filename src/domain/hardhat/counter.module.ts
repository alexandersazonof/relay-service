import { Module } from '@nestjs/common';
import { Web3Module } from 'src/domain/web3/web3.module';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';

@Module({
  imports: [Web3Module],
  controllers: [CounterController],
  providers: [CounterService],
})
export class CounterModule {}
