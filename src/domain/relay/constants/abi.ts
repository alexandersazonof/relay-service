import { AbiItem } from 'web3';

export const abi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'notContract',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'tracingInfo',
        type: 'string',
      },
    ],
    name: 'SacraRelayCallToNotContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayDeadline',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayDelegationExpired',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'callChainId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockChainId',
        type: 'uint256',
      },
    ],
    name: 'SacraRelayInvalidChainId',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'callNonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'txNonce',
        type: 'uint256',
      },
    ],
    name: 'SacraRelayInvalidNonce',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayInvalidSignature',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'selector',
        type: 'bytes4',
      },
      {
        internalType: 'string',
        name: 'tracingInfo',
        type: 'string',
      },
    ],
    name: 'SacraRelayNoErrorSelector',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayNotAllowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayNotDelegator',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayNotOperator',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SacraRelayNotOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'errorBytes',
        type: 'bytes',
      },
      {
        internalType: 'string',
        name: 'tracingInfo',
        type: 'string',
      },
    ],
    name: 'SacraRelayUnexpectedReturnData',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct SacraRelay.CallWithERC2771',
        name: 'callData',
        type: 'tuple',
      },
    ],
    name: 'CalledFromDelegator',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct SacraRelay.CallWithERC2771',
        name: 'callData',
        type: 'tuple',
      },
    ],
    name: 'CalledFromOperator',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CALL_ERC2771_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DELEGATION_DEADLINE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'NAME',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct SacraRelay.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
    ],
    name: 'callFromDelegator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct SacraRelay.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'userSignature_',
        type: 'bytes',
      },
    ],
    name: 'callFromOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'add',
        type: 'bool',
      },
    ],
    name: 'changeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'closeDelegation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
    ],
    name: 'delegate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'delegatedCallers',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'delegatedDeadline',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operatorsList',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'allowed',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'delegatorDeadline',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userTxNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];
