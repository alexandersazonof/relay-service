import { ChainEnum } from 'src/domain/web3/constants/chain.enum';

export enum ContractEnum {
  Relay = 'relay',
  Hero = 'hero',
}

export const ContractAddresses: Record<ChainEnum, Record<ContractEnum, string>> = {
  [ChainEnum.Hardhat]: {
    [ContractEnum.Relay]: '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f',
    [ContractEnum.Hero]: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4',
  },
  [ChainEnum.Fantom]: {
    [ContractEnum.Relay]: '0x52ceba41da235af367bfc0b0ccd3314cb901bb5f',
    [ContractEnum.Hero]: '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4',
  },
};
