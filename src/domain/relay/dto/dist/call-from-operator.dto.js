"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CallFromOperatorDto = void 0;
var class_validator_1 = require("class-validator");
var CallFromOperatorDto = /** @class */ (function () {
    function CallFromOperatorDto() {
        this.chainId = 250;
        this.userNonce = 0;
        this.userDeadline = 0;
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], CallFromOperatorDto.prototype, "chainId");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CallFromOperatorDto.prototype, "fromAddress");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CallFromOperatorDto.prototype, "target");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CallFromOperatorDto.prototype, "data");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CallFromOperatorDto.prototype, "signature");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], CallFromOperatorDto.prototype, "userNonce");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber()
    ], CallFromOperatorDto.prototype, "userDeadline");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CallFromOperatorDto.prototype, "userPrivateKey");
    return CallFromOperatorDto;
}());
exports.CallFromOperatorDto = CallFromOperatorDto;
