import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsInfoDto } from './dto/settingsInfo.dto';
import { SettingEntity } from 'src/entities/profile/setting-profile.entity';

@Injectable()
export class SettingsInfoService {
  constructor(
    @InjectRepository(SettingEntity)
    private settingRepository: Repository<SettingEntity>,
  ) {}

  async saveUserSettings(id: number, settingsInfoDto: SettingsInfoDto) {
    try {
      console.log(settingsInfoDto);
      const newSetting = new SettingEntity();
      newSetting.firstName = settingsInfoDto.firstName;
      newSetting.lastName = settingsInfoDto.lastName;
      newSetting.email = settingsInfoDto.email;
      newSetting.phone = settingsInfoDto.phone;
      newSetting.user = id;
      const profile = await this.settingRepository.save(newSetting);
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSettings(): Promise<SettingEntity[]> {
    const allSetting = await this.settingRepository.find();
    return allSetting;
  }
}
