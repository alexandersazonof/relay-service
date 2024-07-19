import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigValidation } from 'src/core/environment/env.config.validation';
import { RelayModule } from './domain/relay/relay.module';
import { CounterModule } from './domain/hardhat/counter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvConfigValidation }),
    RelayModule,
    CounterModule,
  ],
})
export class AppModule {}
