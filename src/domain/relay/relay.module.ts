import { Module } from '@nestjs/common';
import { Web3ManagerModule } from 'src/common/web3-manager/web3-manager.module';
import { RelayController } from './relay.controller';
import { RelayService } from './relay.service';

@Module({
  imports: [Web3ManagerModule],
  controllers: [RelayController],
  providers: [RelayService],
})
export class RelayModule {}
