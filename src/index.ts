import express, { Request, Response } from 'express';
import Web3, { AbiInput, AbiItem } from 'web3';
import dotenv from 'dotenv';
import { AbiErrorFragment } from 'web3-types/src/eth_abi_types';
import { keccak256 } from 'js-sha3';
import { Interface } from 'ethers';
import realRouter from './routes/RelayRoute';

dotenv.config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_PROVIDER || ''));
const privateKey = process.env.PRIVATE_KEY || '';
const privateKey2 = process.env.PRIVATE_KEY_2 || '';

const app = express();
app.use(express.json());
app.use('/api', realRouter);

const port = process.env.PORT || 3000;

const abi: AbiItem[] =  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "hero",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "heroName_",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "enter",
        "type": "bool"
      }
    ],
    "name": "create",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const abiRelay: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "notContract",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayCallToNotContract",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayDeadline",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayDelegationExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "callChainId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockChainId",
        "type": "uint256"
      }
    ],
    "name": "SacraRelayInvalidChainId",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "callNonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "txNonce",
        "type": "uint256"
      }
    ],
    "name": "SacraRelayInvalidNonce",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayInvalidSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "selector",
        "type": "bytes4"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayNoErrorSelector",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotDelegator",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotOperator",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "errorBytes",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayUnexpectedReturnData",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "userNonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeadline",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct SacraRelay.CallWithERC2771",
        "name": "callData",
        "type": "tuple"
      }
    ],
    "name": "CalledFromDelegator",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "userNonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeadline",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct SacraRelay.CallWithERC2771",
        "name": "callData",
        "type": "tuple"
      }
    ],
    "name": "CalledFromOperator",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CALL_ERC2771_TYPEHASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DELEGATION_DEADLINE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "NAME",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "userNonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct SacraRelay.CallWithERC2771",
        "name": "callInfo",
        "type": "tuple"
      }
    ],
    "name": "callFromDelegator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "userNonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userDeadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct SacraRelay.CallWithERC2771",
        "name": "callInfo",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "userSignature_",
        "type": "bytes"
      }
    ],
    "name": "callFromOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "add",
        "type": "bool"
      }
    ],
    "name": "changeOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "closeDelegation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "delegator",
        "type": "address"
      }
    ],
    "name": "delegate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "delegatedCallers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "delegatedDeadline",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "operatorsList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "allowed",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "delegatorDeadline",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userTxNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];


const abiErrors: AbiErrorFragment[] = [
  {
    "inputs": [
      {
        "internalType": "int32",
        "name": "a",
        "type": "int32"
      },
      {
        "internalType": "int32",
        "name": "b",
        "type": "int32"
      }
    ],
    "name": "AbsDiff",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyHaveReinforcement",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyRegistered",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyStaked",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "pageId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "pageIdFromAnswerHash",
        "type": "uint16"
      }
    ],
    "name": "AnswerPageIdMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "storyId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "storyIdFromAnswerHash",
        "type": "uint16"
      }
    ],
    "name": "AnswerStoryIdMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApproveToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "Broken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BurnAmountExceedsBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "Consumable",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "dungNum",
        "type": "uint16"
      }
    ],
    "name": "DungeonAlreadySpecific",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "dungNum",
        "type": "uint16"
      }
    ],
    "name": "DungeonAlreadySpecific2",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyObjects",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EquipForbiddenInDungeon",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "EquippedItemIsNotAllowedToTransfer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorAlreadyInDungeon",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorCannotRemoveItemFromMap",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "ErrorConsumableItemIsUsed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorDungeonBusy",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorDungeonCompleted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorDungeonIsFreeAlready",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorEquipForbidden",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorExperienceMustNotDecrease",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorForbidden",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "heroToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "heroTokenId",
        "type": "uint256"
      }
    ],
    "name": "ErrorHeroIsDead",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "heroToken",
        "type": "address"
      }
    ],
    "name": "ErrorHeroIsNotRegistered",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorHeroLevelStartFrom1",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorHeroNotInDungeon",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "biome",
        "type": "uint256"
      }
    ],
    "name": "ErrorIncorrectBiome",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemType",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "itemSlot",
        "type": "uint8"
      }
    ],
    "name": "ErrorItemNotEligibleForTheSlot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorItemNotInSlot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorItemSlotBusy",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "slot",
        "type": "uint8"
      }
    ],
    "name": "ErrorItemSlotBusyHand",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "heroLevel",
        "type": "uint256"
      }
    ],
    "name": "ErrorLevelTooLow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorMaxLevel",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "heroBiome",
        "type": "uint8"
      }
    ],
    "name": "ErrorNoDungeonsForBiome",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNoEligibleDungeons",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotBiome",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotChances",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotCompleted",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorNotDeployer",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorNotDungeonFactory",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "heroToken",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "dungNum",
        "type": "uint16"
      }
    ],
    "name": "ErrorNotEligible",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotEnoughExperience",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "mana",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "requiredMana",
        "type": "uint256"
      }
    ],
    "name": "ErrorNotEnoughMana",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotGoc",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorNotHeroController",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "heroToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "msgSender",
        "type": "address"
      }
    ],
    "name": "ErrorNotHeroOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorNotItemController",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotObject1",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotObject2",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ErrorNotObjectController",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotReady",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorNotStages",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "treasureToken",
        "type": "address"
      }
    ],
    "name": "ErrorNotValidTreasureToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorOnlyEoa",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorPaused",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "heroLevel",
        "type": "uint256"
      }
    ],
    "name": "ErrorWrongLevel",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorWrongLevelUpSum",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "multiplier",
        "type": "uint256"
      }
    ],
    "name": "ErrorWrongMultiplier",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "stage",
        "type": "uint256"
      }
    ],
    "name": "ErrorWrongStage",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorZeroKarmaNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FightDelay",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "biome",
        "type": "uint8"
      }
    ],
    "name": "GenObjectIdBiomeOverflow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "GenObjectIdIdOverflow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "subType",
        "type": "uint256"
      }
    ],
    "name": "GenObjectIdSubTypeOverflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "HeroInDungeon",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "HeroTokensVaultAlreadySet",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "IdOverflow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "int32",
        "name": "min",
        "type": "int32"
      },
      {
        "internalType": "int32",
        "name": "max",
        "type": "int32"
      }
    ],
    "name": "IncorrectMinMaxAttributeRange",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidHeroClass",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidProof",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ItemEquipped",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "ItemIsAlreadyEquipped",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ItemMetaTypeChanged",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ItemTypeChanged",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LengthsMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "fee",
        "type": "uint8"
      }
    ],
    "name": "MaxFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MintToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NameTaken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoHeroesAvailable",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "payTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "NoPayToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoStakedHeroes",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "atype",
        "type": "uint256"
      }
    ],
    "name": "NotAType",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAnswer",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "NotConsumable",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "NotEOA",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requiredAmount",
        "type": "uint256"
      }
    ],
    "name": "NotEnoughAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotEnoughBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "expectedBalance",
        "type": "uint256"
      }
    ],
    "name": "NotEnoughTokens",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "NotEquipped",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "NotExistToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "NotFutureGovernance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotGlobalData",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "NotGovernance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotHeroData",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotItem1",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotItem2",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotMagic",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "NotMinter",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "random",
        "type": "uint32"
      }
    ],
    "name": "NotRandom",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotStaked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotYourAttackItem",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotYourBuffItem",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotYourDebuffItem",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ObjectNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OracleWrongInput",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pageId",
        "type": "uint256"
      }
    ],
    "name": "PageNotRemovedError",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RequirementsToItemAttributes",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "notContract",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayCallToNotContract",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayDeadline",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayDelegationExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "callChainId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockChainId",
        "type": "uint256"
      }
    ],
    "name": "SacraRelayInvalidChainId",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "callNonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "txNonce",
        "type": "uint256"
      }
    ],
    "name": "SacraRelayInvalidNonce",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayInvalidSignature",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "selector",
        "type": "bytes4"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayNoErrorSelector",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotDelegator",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotOperator",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SacraRelayNotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "errorBytes",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "tracingInfo",
        "type": "string"
      }
    ],
    "name": "SacraRelayUnexpectedReturnData",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SameIdsNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StakeHeroNotStats",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "heroToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "heroId",
        "type": "uint256"
      }
    ],
    "name": "Staked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TakeOffForbiddenInDungeon",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenTransferNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TooBigName",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "augmentationLevel",
        "type": "uint8"
      }
    ],
    "name": "TooHighAgLevel",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "biome",
        "type": "uint256"
      }
    ],
    "name": "TooHighBiome",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "chance",
        "type": "uint32"
      }
    ],
    "name": "TooHighChance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "random",
        "type": "uint256"
      }
    ],
    "name": "TooHighRandom",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "TooLowX",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferAmountExceedsBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "attackType",
        "type": "uint256"
      }
    ],
    "name": "UnknownAttackType",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "heroClass",
        "type": "uint256"
      }
    ],
    "name": "UnknownHeroClass",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "item",
        "type": "address"
      }
    ],
    "name": "UnknownItem",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "objectSubType",
        "type": "uint8"
      }
    ],
    "name": "UnknownObjectTypeForSubtype",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "objectType",
        "type": "uint8"
      }
    ],
    "name": "UnknownObjectTypeGoc1",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "objectType",
        "type": "uint8"
      }
    ],
    "name": "UnknownObjectTypeGoc2",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "objectType",
        "type": "uint8"
      }
    ],
    "name": "UnknownObjectTypeGocLib1",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "objectType",
        "type": "uint8"
      }
    ],
    "name": "UnknownObjectTypeGocLib2",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UseForbiddenZeroPayToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "chances",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "maxChances",
        "type": "uint32"
      }
    ],
    "name": "WrongChances",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongGetObjectTypeInput",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongSpecificDungeon",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongSymbolsInTheName",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAugmentation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroChance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroDurability",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroItemMetaType",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroLevel",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroLife",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroStoryIdAction",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroStoryIdRemoveStory",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroStoryIdStoryAction",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroValueNotAllowed",
    "type": "error"
  }
]


// const sacraRelayAddress = '0x7dE83f09855687217322f4797E3C95A046992Ade';
const sacraRelayAddress = '0x52CEba41Da235Af367bFC0b0cCd3314cb901bB5F';
const sacraRelayContract = new web3.eth.Contract(abiRelay, sacraRelayAddress);

const heroContractAddress = '0xBe46D95DB685aB3A544D321E196375B737ea6Bc4';
const heroContract = new web3.eth.Contract(abi, heroContractAddress);

const acc1 = '0x754341F215cBc80D8548b853Fd1F60C3FDaE6B26';
const acc2 = '0x2F5294b805f6c0b4B7942c88111d8fB3c0597051';


app.get('/error', async (req: Request, res: Response) => {
  const errorData = '0xa1a48f3a';

  for (let i = 0; i < abiErrors.length; i++) {
    try {
      const abiError = abiErrors[i];
      if (abiErrors[i]['inputs']) {
        const signature = `${abiError.name}(${(abiError.inputs || []).map((input: any) => input.type).join(',')})`;
        const hash = '0x' + keccak256(signature).substring(0, 8);
        const iface = new Interface([abiError]);
        // console.log(iface.get)
        if (hash == errorData.substring(0, 10)) {
          console.log(`Error `, abiErrors[i].name);
          if (errorData.length > 10) {
            const decoded = web3.eth.abi.decodeParameters((abiErrors[i].inputs || []) as AbiErrorFragment[], errorData.slice(10))
            console.log(decoded);
          }
        }

      }

    } catch (e) {
      console.log(e)
    }
  }
  res.json({ success: true });
});

app.get('/delegate', async (req: Request, res: Response) => {
  try {
    const gas = await web3.eth.estimateGas({
      from: acc2,
      to: sacraRelayAddress,
      data: sacraRelayContract.methods.delegate(acc1).encodeABI()
    });

    console.log(gas);
    const tx = {
      from: acc2,
      to: sacraRelayAddress,
      gas: gas,
      gasPrice: await web3.eth.getGasPrice(),
      data: sacraRelayContract.methods.delegate(acc1).encodeABI()
    };



    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey2);
    if (signedTx.rawTransaction) {
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(receipt);
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'Signing failed' });
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: e });
  }
});

app.get('/test', async (req: Request, res: Response) => {
  try {
    const gas = await web3.eth.estimateGas({
      from: acc2,
      to: heroContractAddress,
      data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI()
    });

    const tx = {
      from: acc2,
      to: heroContractAddress,
      gas: gas,
      gasPrice: await web3.eth.getGasPrice(),
      data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI()
    }
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey2);
    if (signedTx.rawTransaction) {
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(receipt);
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'Signing failed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: e });
  }

});

app.get('/', async (req: Request, res: Response) => {
  try {

    const callInfo = {
      chainId: 250,
      target: heroContractAddress,
      data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI(),
      user: acc2,
      userNonce: 1,
      userDeadline: 0
    };

    const gas = await web3.eth.estimateGas({
      from: acc1,
      to: sacraRelayAddress,
      data: sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI()
    });

    const tx = {
      from: acc1,
      to: sacraRelayAddress,
      gas: gas,
      gasPrice: await web3.eth.getGasPrice(),
      data: sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI()
    };


    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    if (signedTx.rawTransaction) {
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(receipt);
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'Signing failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});