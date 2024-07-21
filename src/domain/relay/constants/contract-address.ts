import { ChainEnum } from 'src/domain/web3/constants/chain.enum';

export enum ContractEnum {
  Relay = 'relay',
  Hero = 'hero',
  Counter = 'counter',
}

export const ContractAddresses: Record<ChainEnum, Partial<Record<ContractEnum, string>>> = {
  [ChainEnum.Hardhat]: {
    [ContractEnum.Relay]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    [ContractEnum.Counter]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  [ChainEnum.Fantom]: {
    [ContractEnum.Relay]: '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f',
    [ContractEnum.Hero]: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4',
  },
};
