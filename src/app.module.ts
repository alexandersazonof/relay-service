import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigValidation } from 'src/core/environment/env.config.validation';
import { RelayModule } from './domain/relay/relay.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvConfigValidation }),
    RelayModule,
  ],
})
export class AppModule {}
