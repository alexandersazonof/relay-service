import { AbiErrorFragment } from "web3-types/src/eth_abi_types";

export const abiErrors: AbiErrorFragment[] = [
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
];
