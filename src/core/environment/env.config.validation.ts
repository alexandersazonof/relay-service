import * as Joi from 'joi';
import { IEnvConfig } from './env.config.interface';

export const EnvConfigValidation: Joi.ObjectSchema<IEnvConfig> = Joi.object({
  // RPC_PROVIDER: Joi.string().required(),
  PORT: Joi.number().required(),

  ACCOUNT_ADDRESS: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
});
