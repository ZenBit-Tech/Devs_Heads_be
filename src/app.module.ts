import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './google.strategy';
import { ProfileModule } from './modules/profile/profile.module';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { SettingsInfoModule } from './modules/settingsInfo/settingsInfo.module';
import { JobPostModule } from './modules/jobPost/jobPost.module';
import { ProposalPostModule } from './modules/proposal/proposal.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule, ProfileModule, JobPostModule, ProposalPostModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: process.env.CLEARDB_DATABASE_URL,
        entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        logging: true,
        migrationsRun: false,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          port: 587,
          auth: {
            user: 'apikey',
            pass: configService.get<string>('SENDGRID_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    ConfigModule,
    AuthModule,
    ProfileModule,
    SettingsInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
