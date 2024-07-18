import { FantomProvider } from '../providers/fantom-provider';
import { HardhatProvider } from '../providers/hardhat-provider';
import { ChainEnum } from './chain.enum';

export const Providers = {
  [ChainEnum.Fantom]: FantomProvider,
  [ChainEnum.Hardhat]: HardhatProvider,
};
