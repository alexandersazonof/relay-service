import { AbiItem } from 'web3';

export const abi: AbiItem[] = [
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
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
