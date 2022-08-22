import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/profile/category.entity';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('categories')
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.profileService.getAllCategories();
  }

  @Get('skills')
  getAllSkills() {
    return this.profileService.getAllSkills();
  }

  @Get(':id')
  getProfileSettings(@Param('id') id: number) {
    return this.profileService.getProfileSettings(Number(id));
  }

  @Post()
  saveProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.saveProfile(profileDto);
  }
}
