import { AbiItem } from 'web3';

export const abiHero: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'hero',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'heroName_',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'enter',
        type: 'bool',
      },
    ],
    name: 'create',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
