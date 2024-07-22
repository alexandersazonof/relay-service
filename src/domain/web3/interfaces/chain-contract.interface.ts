import { AbiItem, Contract } from 'web3';

export interface IChainContract {
  contract: Contract<AbiItem[]>;
  address: string;
  abi: AbiItem[];
}
