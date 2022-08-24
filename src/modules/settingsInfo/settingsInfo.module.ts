import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SettingsInfoController } from './settingsInfo.controller';
import { SettingsInfoService } from './settingsInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SettingsInfoService],
  controllers: [SettingsInfoController],
})
export class SettingsInfoModule {}
