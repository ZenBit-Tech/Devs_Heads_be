import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { SettingsInfoDto } from './dto/settingsInfo.dto';
import { SettingsInfoService } from './settingsInfo.service';

@Controller('contact-info')
export class SettingsInfoController {
  constructor(private readonly settingsInfoService: SettingsInfoService) {}

  @Post(':id')
  create(
    @Param('id') id: number,
    @Body()
    settingsInfoDto: SettingsInfoDto,
  ): Promise<User> {
    return this.settingsInfoService.saveUserSettings(Number(id), settingsInfoDto);
  }

  @Get('setting')
  getAllSettings(): Promise<User[]> {
    return this.settingsInfoService.getAllSettings();
  }
}
