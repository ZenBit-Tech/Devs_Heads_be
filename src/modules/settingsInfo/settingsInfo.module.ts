import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SettingEntity } from 'src/entities/profile/setting-profile.entity';
import { User } from 'src/entities/user.entity';
import { SettingsInfoController } from './settingsInfo.controller';
import { SettingsInfoService } from './settingsInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity, User, ProfileEntity])],
  providers: [SettingsInfoService],
  controllers: [SettingsInfoController],
})
export class SettingsInfoModule {}
