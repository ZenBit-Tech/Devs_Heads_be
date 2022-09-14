import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { CreateUserDto } from './profile-filter.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('category')
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.profileService.getAllCategories();
  }

  @Get('skills')
  getAllSkills() {
    return this.profileService.getAllSkills();
  }

  @Get('filter')
  async findAll(@Query() userQuery: CreateUserDto) {
    const profileInfo = await this.profileService.queryBuilderSkills('skillsprofile');
    const user = await this.profileService.queryBuilderUser('userprofile');
    const filterProfile = await this.profileService.paginationFilter(userQuery, profileInfo);

    if (userQuery.sort) {
      filterProfile.orderBy('skillsprofile.price', 'ASC');
    }

    const filter = await filterProfile.getMany();
    const users = await user.getMany();
    let result = [];

    filter.map((el) => {
      users.map((user) => {
        if (el.userId === user.user && user.user > 0) {
          result.push({ filter: el, user: user });
        }
      });
    });

    const Paginate = async () => {
      if (userQuery.page && filterProfile && result) {
        const limit = 6;
        const page = parseInt(userQuery.page) || 1;
        const total = result.length;
        const lastProfileIndex = page * limit;
        const firstProfileIndex = lastProfileIndex - limit;
        result = result?.slice(firstProfileIndex, lastProfileIndex);
        return {
          total,
          page,
          limit,
        };
      }
    };
    const singlePage = await Paginate();

    return {
      profile: result,
      total: singlePage?.total,
      page: singlePage?.page,
      last_page: Math.ceil(singlePage?.total / singlePage?.limit),
      limit: 6,
      query: user.getMany(),
    };
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
