import { Module } from '@nestjs/common';
import { Web3Module } from 'src/domain/web3/web3.module';
import { RelayController } from './relay.controller';
import { RelayService } from './relay.service';

@Module({
  imports: [Web3Module],
  controllers: [RelayController],
  providers: [RelayService],
})
export class RelayModule {}
