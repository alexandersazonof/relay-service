import { abi as counterAbi } from 'src/domain/counter/constants/abi';
import { abi as relayAbi } from 'src/domain/relay/constants/abi';
import { abi as heroAbi } from 'src/domain/hero/constants/abi';
import { IChainData } from '../interfaces/chain-data.interface';

const fantomChain: IChainData = {
  name: 'fantom',
  rpcUrl: 'https://rpcapi.fantom.network',
  chainId: 250,
  contracts: {
    counter: {
      address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      abi: counterAbi,
    },
    sacraRelay: {
      address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
      abi: relayAbi,
    },
  },
};
const hardhatChain: IChainData = {
  name: 'hardhat',
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: 31337,
  contracts: {
    sacraRelay: {
      address: '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f',
      abi: relayAbi,
    },
    hero: {
      address: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4',
      abi: heroAbi,
    },
  },
};

export const chains = new Map<number, IChainData>([
  [fantomChain.chainId, fantomChain],
  [hardhatChain.chainId, hardhatChain],
]);
