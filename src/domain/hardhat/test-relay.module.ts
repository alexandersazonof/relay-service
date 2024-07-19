import { Module } from '@nestjs/common';
import { Web3Module } from 'src/domain/web3/web3.module';
import { TestRelayController } from './test-relay.controller';
import { TestRelayService } from './test-relay.service';

@Module({
  imports: [Web3Module],
  controllers: [TestRelayController],
  providers: [TestRelayService],
})
export class TestRelayModule {}
