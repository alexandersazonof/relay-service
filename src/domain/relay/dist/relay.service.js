"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RelayService = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
var secp256k1_js_1 = require("ethereum-cryptography/secp256k1.js");
var web3_utils_1 = require("web3-utils");
var RelayService = /** @class */ (function () {
    function RelayService(configService, web3Service) {
        this.configService = configService;
        this.web3Service = web3Service;
        this.sacraHeroContract = new this.web3Service.instance.eth.Contract(constants_1.abiHero, constants_1.ContractAddress.Hero);
        this.sacraRelayContract = new this.web3Service.instance.eth.Contract(constants_1.abiRelay, constants_1.ContractAddress.Relay);
    }
    RelayService.prototype.checkAllowedContractAddress = function (address) {
        var contracts = Object.values(constants_1.ContractAddress);
        var isKnownContactAddress = contracts.includes(address);
        if (!isKnownContactAddress) {
            throw new common_1.InternalServerErrorException("Contract address " + address + " not allowed");
        }
    };
    RelayService.prototype.getHashedMessage = function (callInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var CALL_ERC2771_TYPEHASH, DOMAIN_SEPARATOR, encodedParametrs, message, encodedMessage, hashedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sacraRelayContract.methods
                            .CALL_ERC2771_TYPEHASH()
                            .call()];
                    case 1:
                        CALL_ERC2771_TYPEHASH = _a.sent();
                        return [4 /*yield*/, this.sacraRelayContract.methods
                                .DOMAIN_SEPARATOR()
                                .call()];
                    case 2:
                        DOMAIN_SEPARATOR = _a.sent();
                        encodedParametrs = this.web3Service.instance.eth.abi.encodeParameters(['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'], [
                            CALL_ERC2771_TYPEHASH,
                            callInfo.chainId,
                            callInfo.target,
                            this.web3Service.instance.utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
                            callInfo.fromAddress,
                            callInfo.userNonce,
                            callInfo.userDeadline,
                        ]);
                        message = this.web3Service.instance.utils.soliditySha3({
                            type: 'bytes',
                            value: encodedParametrs
                        });
                        encodedMessage = this.web3Service.instance.utils.encodePacked({ type: 'bytes', value: ['0x19', '0x01'] }, {
                            type: 'bytes',
                            value: DOMAIN_SEPARATOR
                        }, {
                            type: 'bytes',
                            value: message
                        });
                        hashedMessage = this.web3Service.instance.utils.soliditySha3({
                            type: 'bytes',
                            value: encodedMessage
                        });
                        return [2 /*return*/, { hashedMessage: hashedMessage, message: message }];
                }
            });
        });
    };
    RelayService.prototype.createSignatureManually = function (hashMessage, privateKeyUint8Array) {
        return __awaiter(this, void 0, void 0, function () {
            var signatureSigned, signatureBytes, r;
            return __generator(this, function (_a) {
                signatureSigned = secp256k1_js_1.secp256k1.sign(hashMessage, privateKeyUint8Array);
                signatureBytes = signatureSigned.toCompactRawBytes();
                r = (signatureSigned.recovery + 27).toString(16);
                return [2 /*return*/, "" + web3_utils_1.bytesToHex(signatureBytes) + r];
            });
        });
    };
    RelayService.prototype.signCallWithERC2771 = function (callInfo, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedMessage, messageHexWithoutPrefix, privateKeyUint8Array;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHashedMessage(callInfo)];
                    case 1:
                        hashedMessage = (_a.sent()).hashedMessage;
                        messageHexWithoutPrefix = hashedMessage.substring(2);
                        privateKeyUint8Array = this.web3Service.instance.eth.accounts.parseAndValidatePrivateKey(privateKey);
                        return [2 /*return*/, this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array)];
                }
            });
        });
    };
    RelayService.prototype.callFromDelegator = function (callFromDelegatorDto) {
        return __awaiter(this, void 0, void 0, function () {
            var callInfo, transactionData, gas, gasPrice, tx, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAllowedContractAddress(callFromDelegatorDto.target);
                        callInfo = {
                            chainId: 250,
                            target: callFromDelegatorDto.target,
                            data: callFromDelegatorDto.data,
                            user: callFromDelegatorDto.fromAddress,
                            userNonce: 1,
                            userDeadline: 0
                        };
                        transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
                        return [4 /*yield*/, this.web3Service.instance.eth.estimateGas({
                                from: this.web3Service.masterAccountAddress,
                                to: constants_1.ContractAddress.Relay,
                                data: transactionData
                            })];
                    case 1:
                        gas = _a.sent();
                        return [4 /*yield*/, this.web3Service.instance.eth.getGasPrice()];
                    case 2:
                        gasPrice = _a.sent();
                        tx = {
                            from: this.web3Service.masterAccountAddress,
                            to: constants_1.ContractAddress.Relay,
                            gas: gas,
                            gasPrice: gasPrice,
                            data: transactionData
                        };
                        return [4 /*yield*/, this.web3Service.instance.eth.accounts.signTransaction(tx, this.web3Service.masterAccountPrivateKey)];
                    case 3:
                        signedTx = _a.sent();
                        if (!signedTx.rawTransaction) {
                            throw new common_1.InternalServerErrorException("Signing failed");
                        }
                        return [4 /*yield*/, this.web3Service.instance.eth.sendSignedTransaction(signedTx.rawTransaction)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                }
            });
        });
    };
    RelayService.prototype.callFromOperator = function (callFromOperatorDto) {
        return __awaiter(this, void 0, void 0, function () {
            var callInfo, txData, tx, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAllowedContractAddress(callFromOperatorDto.target);
                        callInfo = {
                            chainId: 250,
                            target: callFromOperatorDto.target,
                            data: callFromOperatorDto.data,
                            user: callFromOperatorDto.fromAddress,
                            userNonce: 0,
                            userDeadline: 0
                        };
                        console.log('[callInfo, signature]', callInfo, callFromOperatorDto.signature);
                        txData = this.sacraRelayContract.methods
                            .callFromOperator(callInfo, callFromOperatorDto.signature)
                            .encodeABI();
                        tx = {
                            from: this.web3Service.masterAccountAddress,
                            to: constants_1.ContractAddress.Relay,
                            data: txData
                        };
                        return [4 /*yield*/, this.web3Service.instance.eth
                                .sendTransaction(__assign({}, tx))["catch"](function (error) { return error; })];
                    case 1:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    RelayService.prototype.userCallFromOperator = function (callFromOperatorDto, userPrivateKey) {
        if (userPrivateKey === void 0) { userPrivateKey = this.web3Service.masterAccountPrivateKey; }
        return __awaiter(this, void 0, void 0, function () {
            var signature, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.signCallWithERC2771(callFromOperatorDto, userPrivateKey)];
                    case 1:
                        signature = _a.sent();
                        return [4 /*yield*/, this.callFromOperator({
                                chainId: callFromOperatorDto.chainId,
                                fromAddress: this.web3Service.masterAccountAddress,
                                target: callFromOperatorDto.target,
                                data: callFromOperatorDto.data,
                                userNonce: callFromOperatorDto.userNonce,
                                userDeadline: callFromOperatorDto.userDeadline,
                                signature: signature
                            })["catch"](function (error) { return error; })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    RelayService = __decorate([
        common_1.Injectable()
    ], RelayService);
    return RelayService;
}());
exports.RelayService = RelayService;
// async create() {
//   try {
//     const gas = await this.web3Service.instance.eth.estimateGas({
//       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
//       to: ContractAddress.Hero,
//       data: this.sacraHeroContract.methods
//         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
//         .encodeABI(),
//     });
//     const tx = {
//       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
//       to: ContractAddress.Hero,
//       gas: gas,
//       gasPrice: await this.web3Service.instance.eth.getGasPrice(),
//       data: this.sacraHeroContract.methods
//         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
//         .encodeABI(),
//     };
//     const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
//       tx,
//       '455a3303a58926b697225f13b64ccddcc3d79fe3f24c4c20c3163107ece680ed',
//     );
//     if (signedTx.rawTransaction) {
//       const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//       );
//       console.log(receipt);
//       return { success: true };
//     } else {
//       throw new InternalServerErrorException({ success: false, message: 'Signing failed' });
//     }
//   } catch (e) {
//     console.log(e);
//     throw new InternalServerErrorException({ success: false, message: e });
//   }
// }
// new this.web3Service.instance.eth.abi.encode
// const createHeroData = {
//   address: '0x5b169bfd148175ba0bb1259b75978a847c75fe5b',
//   name: 'RandomHeroName' + Math.floor(Math.random() * 1000),
//   options: false,
// };
// const createHeroEncoded = this.sacraHeroContract.methods
//   .create(createHeroData.address, createHeroData.name, createHeroData.options)
//   .encodeABI();
// const callInfo: ICallWithERC2771 = {
//   chainId: 250,
//   target: ContractAddress.Hero,
//   data: createHeroEncoded,
//   user: this.web3Service.masterAccountAddress,
//   userNonce: 0,
//   userDeadline: 0,
// };
