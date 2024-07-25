import * as Joi from 'joi';
import { IEnvConfig } from './env.config.interface';
export const EnvConfigValidation: Joi.ObjectSchema<IEnvConfig> = Joi.object({
  /* BLOCKCHAIN DATA */
  CHAIN_NAME: Joi.string().required(),
  RPC_URL: Joi.string().required(),
  CHAIN_ID: Joi.number().required(),

  /* CHAIN CONTRACTS */
  SACRA_RELAY_CONTRACT_ADDRESS: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .message('Invalid sacra relay contract address')
    .required(),

  /* MASTER ACCOUNT */
  ACCOUNT_ADDRESS: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),

  /* SERVER */
  PORT: Joi.number().required(),
});
