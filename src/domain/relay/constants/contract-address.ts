import { ChainEnum } from 'src/domain/web3/constants/chain.enum';
import { abiCounter } from './abi-counter';
import { abiRelay } from './abi-relay';
import { abiHero } from './abi-hero';
import { AbiItem } from 'web3';

export enum ContractEnum {
  Relay = 'relay',
  Hero = 'hero',
  Counter = 'counter',
}

export const ContractsDescription: Record<
  ChainEnum,
  Partial<Record<ContractEnum, { address: string; abi: AbiItem[] }>>
> = {
  [ChainEnum.Hardhat]: {
    [ContractEnum.Counter]: {
      address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      abi: abiCounter,
    },
    [ContractEnum.Relay]: { address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512', abi: abiRelay },
  },
  [ChainEnum.Fantom]: {
    [ContractEnum.Relay]: { address: '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f', abi: abiRelay },
    [ContractEnum.Hero]: { address: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4', abi: abiHero },
  },
};

// export const Contracts: Record<ChainEnum, Record<ContractEnum, Contract<AbiItem[]>>> = (() => {
//   const chainsContractsDesctiption = Object.keys(ContractsDescription);

//   const contractsChain = chainsContractsDesctiption.map((chainContractDescription) => {
//     const chainContractsNames = Object.keys(
//       ContractsDescription[<ChainEnum>chainContractDescription],
//     );

//     const contractInstances = chainContractsNames.map((contractName) => {
//       const description =
//         ContractsDescription[<ChainEnum>chainContractDescription][<ContractEnum>contractName];

//       const contractInstance = new Contract(description.abi, description.address);

//       return { [contractName]: contractInstance };
//     });

//     return { [chainContractDescription]: Object.assign({}, ...contractInstances) };
//   });

//   return Object.assign({}, ...contractsChain);
// })();
