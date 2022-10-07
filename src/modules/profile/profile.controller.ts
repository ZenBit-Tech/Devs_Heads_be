import { Body, Controller, Get, Post, Param, Query, Put } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { FindUserDto } from './profile-filter.dto';
import { SkillsEntity } from 'src/entities/skills.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { FavouriteEntity } from 'src/entities/profile/favourite.entity';
import { User } from 'src/entities/user.entity';
import { SavedProfileDto } from './dto/status.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('category')
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.profileService.getAllCategories();
  }

  @Get('skills')
  getAllSkills(): Promise<SkillsEntity[]> {
    return this.profileService.getAllSkills();
  }

  @Get('allItem')
  getAllProfile(): Promise<ProfileEntity[]> {
    return this.profileService.getAllProfile();
  }

  @Get('filter')
  async findAll(
    @Query() userQuery: FindUserDto,
  ): Promise<{ profile: ProfileEntity[]; total: number; page: number; last_page: number; limit: number }> {
    const profileInfo = await this.profileService.queryBuilderSkills('skillsprofile');
    const filterProfile = await this.profileService.paginationFilter(userQuery, profileInfo);

    if (userQuery.sort) {
      filterProfile.orderBy('skillsprofile.price', 'ASC');
    }
    let filter = await filterProfile.getMany();

    const Paginate = async () => {
      if (userQuery.page && filterProfile) {
        const limit = 6;
        const page = parseInt(userQuery.page) || 1;
        const total = filter.length;
        const lastProfileIndex = page * limit;
        const firstProfileIndex = lastProfileIndex - limit;
        filter = filter?.slice(firstProfileIndex, lastProfileIndex);
        return {
          total,
          page,
          limit,
        };
      }
    };
    const singlePage = await Paginate();

    return {
      profile: filter,
      total: singlePage?.total,
      page: singlePage?.page,
      last_page: Math.ceil(singlePage?.total / singlePage?.limit),
      limit: 6,
    };
  }

  @Get(':id/savedTalent')
  async findSavedTalent(
    @Param('id') id: number,
    @Query('page') page: string,
  ): Promise<{ profile: ProfileEntity[]; total: number; page: string; limit: number }> {
    let savedTalent = await (await this.profileService.querySavedTalent('savedtalent', id)).getMany();

    const Paginate = async () => {
      if (page) {
        const limit = 6;
        const pageInt = parseInt(page) || 1;
        const total = savedTalent.length;
        const lastProfileIndex = pageInt * limit;
        const firstProfileIndex = lastProfileIndex - limit;
        savedTalent = savedTalent?.slice(firstProfileIndex, lastProfileIndex);
        return {
          total,
          page,
          limit,
        };
      }
    };
    const singlePage = await Paginate();

    return {
      profile: savedTalent,
      total: singlePage?.total,
      page: singlePage?.page,
      limit: 6,
    };
  }

  @Get(':id/:clientId')
  getProfileSettings(
    @Param('id') id: number,
    @Param('clientId') clientId: number,
  ): Promise<{ profile: ProfileEntity; setting: User; status: FavouriteEntity }> {
    return this.profileService.getProfileSettings(Number(id), Number(clientId));
  }

  @Put(':id')
  updateSingleProfile(
    @Param('id') id: number,
    @Body() saved: { saved: boolean; clientId: number },
  ): Promise<FavouriteEntity[] | SavedProfileDto> {
    return this.profileService.updateSingleProfile(Number(id), saved);
  }

  @Post()
  saveProfile(@Body() profileDto: ProfileDto): Promise<ProfileEntity> {
    return this.profileService.saveProfile(profileDto);
  }
}
