// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.23;

/// @notice All errors of the app
interface IAppErrors {
    error ZeroAddress();
    error ZeroValueNotAllowed();
    error LengthsMismatch();
    error NotEnoughBalance();

    //region Restrictions
    error ErrorNotDeployer(address sender);
    error ErrorNotGoc();
    error NotGovernance(address sender);
    error ErrorOnlyEoa();
    error NotEOA(address sender);
    error ErrorForbidden(address sender);
    error ErrorNotItemController(address sender);
    error ErrorNotHeroController(address sender);
    error ErrorNotDungeonFactory(address sender);
    error ErrorNotObjectController(address sender);
    //endregion Restrictions

    //region Hero
    error ErrorHeroIsNotRegistered(address heroToken);
    error ErrorHeroIsDead(address heroToken, uint256 heroTokenId);
    error ErrorHeroNotInDungeon();
    error HeroInDungeon();
    error ErrorNotHeroOwner(address heroToken, address msgSender);
    error Staked(address heroToken, uint256 heroId);
    error HeroTokensVaultAlreadySet();
    error NameTaken();
    error TooBigName();
    error WrongSymbolsInTheName();
    error NoPayToken(address token, uint256 payTokenAmount);
    error AlreadyHaveReinforcement();
    /// @notice SIP-001 - Reinforcement requires 3 skills
    error ErrorReinforcementRequiresThreeSkills();
    //endregion Hero

    //region Dungeon
    error ErrorDungeonIsFreeAlready();
    error ErrorNoEligibleDungeons();
    error ErrorDungeonBusy();
    error ErrorNoDungeonsForBiome(uint8 heroBiome);
    error ErrorDungeonCompleted();
    error ErrorAlreadyInDungeon();
    error NotEnoughTokens(uint256 balance, uint256 expectedBalance);
    error DungeonAlreadySpecific(uint16 dungNum);
    error DungeonAlreadySpecific2(uint16 dungNum);
    error WrongSpecificDungeon();
    //endregion Dungeon

    //region Items
    error ErrorItemNotEligibleForTheSlot(uint256 itemType, uint8 itemSlot);
    error ErrorItemSlotBusyHand(uint8 slot);
    error ErrorItemSlotBusy();
    error ErrorItemNotInSlot();
    error ErrorConsumableItemIsUsed(address item);
    error ErrorCannotRemoveItemFromMap();
    error ItemEquipped();
    error ZeroItemMetaType();
    error ZeroLevel();
    error ItemTypeChanged();
    error ItemMetaTypeChanged();
    error UnknownItem(address item);
    error ItemIsAlreadyEquipped(address item);
    error ErrorEquipForbidden();
    error EquipForbiddenInDungeon();
    error TakeOffForbiddenInDungeon();
    error Consumable(address item);
    error NotConsumable(address item);
    error Broken(address item);
    error ZeroLife();
    error RequirementsToItemAttributes();
    error NotEquipped(address item);
    error ZeroDurability();
    error ZeroAugmentation();
    error TooHighAgLevel(uint8 augmentationLevel);
    error UseForbiddenZeroPayToken();
    error IncorrectMinMaxAttributeRange(int32 min, int32 max);
    error SameIdsNotAllowed();
    //endregion Items

    //region Stages
    error ErrorWrongStage(uint256 stage);
    error ErrorNotStages();
    //endregion Stages

    //region Level
    error ErrorWrongLevel(uint256 heroLevel);
    error ErrorLevelTooLow(uint256 heroLevel);
    error ErrorHeroLevelStartFrom1();
    error ErrorWrongLevelUpSum();
    error ErrorMaxLevel();
    //endregion Level

    //region Treasure
    error ErrorNotValidTreasureToken(address treasureToken);
    //endregion Treasure

    //region State
    error ErrorPaused();
    error ErrorNotReady();
    error ErrorNotObject1();
    error ErrorNotObject2();
    error ErrorNotCompleted();
    //endregion State

    //region Biome
    error ErrorNotBiome();
    error ErrorIncorrectBiome(uint256 biome);
    error TooHighBiome(uint256 biome);
    //endregion Biome

    //region Misc
    error ErrorWrongMultiplier(uint256 multiplier);
    error ErrorNotEnoughMana(uint32 mana, uint256 requiredMana);
    error ErrorExperienceMustNotDecrease();
    error ErrorNotEnoughExperience();
    error ErrorNotChances();
    error ErrorNotEligible(address heroToken, uint16 dungNum);
    error ErrorZeroKarmaNotAllowed();
    //endregion Misc

    //region GOC
    error GenObjectIdBiomeOverflow(uint8 biome);
    error GenObjectIdSubTypeOverflow(uint256 subType);
    error GenObjectIdIdOverflow(uint256 id);
    error UnknownObjectTypeGoc1(uint8 objectType);
    error UnknownObjectTypeGoc2(uint8 objectType);
    error UnknownObjectTypeGocLib1(uint8 objectType);
    error UnknownObjectTypeGocLib2(uint8 objectType);
    error UnknownObjectTypeForSubtype(uint8 objectSubType);
    error FightDelay();
    error ZeroChance();
    error TooHighChance(uint32 chance);
    error TooHighRandom(uint256 random);
    error EmptyObjects();
    error ObjectNotFound();
    error WrongGetObjectTypeInput();
    error WrongChances(uint32 chances, uint32 maxChances);
    //endregion GOC

    //region Story
    error PageNotRemovedError(uint256 pageId);
    error NotItem1();
    error NotItem2();
    error NotRandom(uint32 random);
    error NotHeroData();
    error NotGlobalData();
    error ZeroStoryIdRemoveStory();
    error ZeroStoryIdStoryAction();
    error ZeroStoryIdAction();
    error NotEnoughAmount(uint256 balance, uint256 requiredAmount);
    error NotAnswer();
    error AnswerStoryIdMismatch(uint16 storyId, uint16 storyIdFromAnswerHash);
    error AnswerPageIdMismatch(uint16 pageId, uint16 pageIdFromAnswerHash);
    //endregion Story

    //region FightLib
    error NotMagic();
    error NotAType(uint256 atype);
    //endregion FightLib

    //region MonsterLib
    error NotYourDebuffItem();
    error UnknownAttackType(uint256 attackType);
    error NotYourAttackItem();
    /// @notice The skill item cannot be used because it doesn't belong either to the hero or to the hero's helper
    error NotYourBuffItem();
    //endregion MonsterLib

    //region GameToken
    error ApproveToZeroAddress();
    error MintToZeroAddress();
    error TransferToZeroAddress();
    error TransferAmountExceedsBalance(uint256 balance, uint256 value);
    error InsufficientAllowance();
    error BurnAmountExceedsBalance();
    error NotMinter(address sender);
    //endregion GameToken

    //region NFT
    error TokenTransferNotAllowed();
    error IdOverflow(uint256 id);
    error NotExistToken(uint256 tokenId);
    error EquippedItemIsNotAllowedToTransfer(uint256 tokenId);
    //endregion NFT

    //region CalcLib
    error TooLowX(uint256 x);
    //endregion CalcLib

    //region Controller
    error NotFutureGovernance(address sender);
    //endregion Controller

    //region Oracle
    error OracleWrongInput();
    //region Oracle

    //region ReinforcementController
    error AlreadyStaked();
    error MaxFee(uint8 fee);
    error MinFee(uint8 fee);
    error StakeHeroNotStats();
    error NotStaked();
    error NoStakedHeroes();
    //region ReinforcementController

    //region SponsoredHero
    error InvalidHeroClass();
    error ZeroAmount();
    error InvalidProof();
    error NoHeroesAvailable();
    error AlreadyRegistered();
    //endregion SponsoredHero

    //region SacraRelay
    error SacraRelayNotOwner();
    error SacraRelayNotDelegator();
    error SacraRelayNotOperator();
    error SacraRelayInvalidChainId(uint256 callChainId, uint256 blockChainId);
    error SacraRelayInvalidNonce(uint256 callNonce, uint256 txNonce);
    error SacraRelayDeadline();
    error SacraRelayDelegationExpired();
    error SacraRelayNotAllowed();
    error SacraRelayInvalidSignature();
    /// @notice This error is generated when custom error is caught
    /// There is no info about custom error in SacraRelay
    /// but you can decode custom error by selector, see tests
    error SacraRelayNoErrorSelector(bytes4 selector, string tracingInfo);
    /// @notice This error is generated when custom error is caught
    /// There is no info about custom error in SacraRelay
    /// but you can decode custom error manually from {errorBytes} as following:
    /// if (keccak256(abi.encodeWithSignature("MyError()")) == keccak256(errorBytes)) { ... }
    error SacraRelayUnexpectedReturnData(bytes errorBytes, string tracingInfo);
    error SacraRelayCallToNotContract(address notContract, string tracingInfo);
    //endregion SacraRelay

    //region Misc
    error UnknownHeroClass(uint256 heroClass);
    error AbsDiff(int32 a, int32 b);
    //region Misc
}
