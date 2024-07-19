import { AbiItem } from 'web3';

export const abiRelay: AbiItem[] = [
  {
    inputs: [],
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
    name: 'SacraRelayNotOperator',
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
    name: '_abiEncodeCallERC2771',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
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
    name: '_requireCallERC2771Digest',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
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
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: '_requireCallERC2771Signature',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contract',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
      {
        internalType: 'string',
        name: '_errorMsg',
        type: 'string',
      },
    ],
    name: '_revertingContractCall',
    outputs: [
      {
        internalType: 'bytes',
        name: 'returnData',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [],
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
    inputs: [],
    name: 'getAllOperators',
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
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: 'recover2',
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
    inputs: [],
    name: 'setAsOperator',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'verify',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
