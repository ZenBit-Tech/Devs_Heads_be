"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_controller_1 = require("./modules/auth/auth.controller");
var auth_service_1 = require("./modules/auth/auth.service");
var auth_module_1 = require("./modules/auth/auth.module");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var test_module_1 = require("./modules/test/test.module");
var sign_up_module_1 = require("./sign-up/sign-up.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                auth_module_1.AuthModule,
                sign_up_module_1.SignUpModule,
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule, sign_up_module_1.SignUpModule],
                    useFactory: function (configService) { return ({
                        type: 'mysql',
                        host: configService.get('MYSQL_HOST'),
                        port: configService.get('MYSQL_PORT'),
                        username: configService.get('MYSQL_USERNAME'),
                        password: configService.get('MYSQL_PASSWORD'),
                        database: configService.get('MYSQL_DATABASE'),
                        entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
                        migrations: [__dirname + '/migrations/*{.ts,.js}'],
                        logging: true,
                        migrationsRun: false,
                        synchronize: true,
                        ssl: {
                            rejectUnauthorized: false
                        }
                    }); },
                    inject: [config_1.ConfigService]
                }),
                config_1.ConfigModule.forRoot(),
                test_module_1.TestModule,
            ],
            controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
            providers: [app_service_1.AppService, auth_service_1.AuthService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
