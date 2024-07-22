import { AbiItem } from 'web3';

export interface IChainContract {
  address: string;
  abi: AbiItem[];
}
