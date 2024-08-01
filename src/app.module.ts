import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigValidation } from 'src/core/environment/env.config.validation';
import { RelayModule } from './domain/relay/relay.module';
import { Web3Module } from './domain/web3/web3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvConfigValidation }),
    RelayModule,
    Web3Module,
  ],
})
export class AppModule {}
