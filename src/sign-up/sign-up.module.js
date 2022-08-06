"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpModule = void 0;
var common_1 = require("@nestjs/common");
var sign_up_service_1 = require("./sign-up.service");
var typeorm_1 = require("@nestjs/typeorm");
var sign_up_controller_1 = require("./sign-up.controller");
var signUp_entity_1 = require("../entities/signUp.entity");
var SignUpModule = /** @class */ (function () {
    function SignUpModule() {
    }
    SignUpModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([signUp_entity_1.SignUp])],
            providers: [sign_up_service_1.SignUpService],
            controllers: [sign_up_controller_1.SignUpController]
        })
    ], SignUpModule);
    return SignUpModule;
}());
exports.SignUpModule = SignUpModule;
