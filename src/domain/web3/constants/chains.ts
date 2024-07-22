import { Contract } from 'web3';
import { abi as counterAbi } from 'src/domain/counter/constants/abi';
import { abi as relayAbi } from 'src/domain/relay/constants/abi';
import { abi as heroAbi } from 'src/domain/hero/constants/abi';
import { IChainData } from '../interfaces/chain-data.interface';

// const fantomCounterContract = new Contract(
//   counterAbi,
//   '0x5fbdb2315678afecb367f032d93f642f64180aa3',
// );
// const fantomSacraRelayContract = new Contract(
//   relayAbi,
//   '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f',
// );
const hardhatSacraRelayContract = new Contract(
  relayAbi,
  '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
);
const hardhatCounterContract = new Contract(relayAbi, '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9');
// const hardhatHeroContract = new Contract(heroAbi, '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4');

// const fantomChain: IChainData = {
//   name: 'fantom',
//   rpcUrl: 'https://rpcapi.fantom.network',
//   chainId: 250,
//   contracts: {
//     counter: {
//       contract: fantomCounterContract,
//       address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
//       abi: counterAbi,
//     },
//     sacraRelay: {
//       contract: fantomSacraRelayContract,
//       address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
//       abi: relayAbi,
//     },
//   },
// };
const hardhatChain: IChainData = {
  name: 'hardhat',
  rpcUrl: 'http://127.0.0.1:8545',
  chainId: 31337,
  contracts: {
    sacraRelay: {
      contract: hardhatSacraRelayContract,
      address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
      abi: relayAbi,
    },
    counter: {
      contract: hardhatCounterContract,
      address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
      abi: counterAbi,
    },
    // hero: {
    //   contract: hardhatHeroContract,
    //   address: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4',
    //   abi: heroAbi,
    // },
  },
};

export const chains = new Map<number, IChainData>([
  // [fantomChain.chainId, fantomChain],
  [hardhatChain.chainId, hardhatChain],
]);
