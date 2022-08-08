"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUp = void 0;
var typeorm_1 = require("typeorm");
var SignUp = /** @class */ (function () {
    function SignUp() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], SignUp.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], SignUp.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], SignUp.prototype, "password");
    SignUp = __decorate([
        (0, typeorm_1.Entity)()
    ], SignUp);
    return SignUp;
}());
exports.SignUp = SignUp;
