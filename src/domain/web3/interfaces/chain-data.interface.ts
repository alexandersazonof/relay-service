import { IChainContracts } from './chain-contracts.interface';

export interface IChainData {
  name: string;
  rpcUrl: string;
  chainId: number;
  contracts: IChainContracts;
}
