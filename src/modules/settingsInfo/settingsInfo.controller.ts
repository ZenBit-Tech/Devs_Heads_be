import { Body, Controller, Post } from '@nestjs/common';
import { SettingsInfoDto } from './dto/settingsInfo.dto';
import { SettingsInfoService } from './settingsInfo.service';

@Controller('contact-info')
export class SettingsInfoController {
  constructor(private readonly settingsInfoService: SettingsInfoService) {}

  @Post()
  create(@Body() settingsInfoDto: SettingsInfoDto) {
    return this.settingsInfoService.saveUserSettings(settingsInfoDto);
  }
}
