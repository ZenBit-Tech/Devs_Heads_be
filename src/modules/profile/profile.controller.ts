import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('categories')
  getAllCategories() {
    return this.profileService.getAllCategories();
  }

  @Get('skills')
  getAllSkils() {
    return this.profileService.getAllSkils();
  }

  @Get()
  getProfileSettings() {
    return this.profileService.getProfileSettings(1);
  }

  @Post()
  saveProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.saveProfile(profileDto);
  }
}
