import * as Joi from 'joi';
import { IEnvConfig } from './env.config.interface';

export const EnvConfigValidation: Joi.ObjectSchema<IEnvConfig> = Joi.object({
  /* BLOCKCHAIN DATA */
  CHAIN_ID: Joi.number().required(),
  CHAIN_RPC_URL: Joi.string().required(),

  /* CHAIN CONTRACTS */
  SACRA_RELAY_CONTRACT_ADDRESS: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/)
    .message('Invalid sacra relay contract address')
    .required(),

  /* MASTER ACCOUNT */
  PRIVATE_KEY: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{64}$/)
    .message('Invalid private key')
    .required(),

  /* SERVER */
  PORT: Joi.number().required(),
});
