import { IChainContract } from './chain-contract.interface';

export interface IChainContracts {
  [contractName: string]: IChainContract;
}
