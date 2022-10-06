import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SkillsEntity } from 'src/entities/skills.entity';
import { ProfileDto } from './dto/profile.dto';
import { FindUserDto } from './profile-filter.dto';
import { User } from 'src/entities/user.entity';
import { SavedProfileDto } from './dto/status.dto';
import { SaveProfileEntity } from 'src/entities/profile/status.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SaveProfileEntity)
    private saveProfileFreelancerRepository: Repository<SaveProfileEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const allCategories = await this.categoryRepository.find();
    return allCategories;
  }

  async getAllSkills(): Promise<SkillsEntity[]> {
    const allSkills = await this.skillsRepository.find();
    return allSkills;
  }
  async getAllProfile(): Promise<ProfileEntity[]> {
    const allProfile = await this.profileRepository.find();
    return allProfile;
  }

  async updateSingleProfile(id: number, save: SavedProfileDto): Promise<SaveProfileEntity[] | SavedProfileDto> {
    const { saved, clientId } = save;
    const profile = await this.saveProfileFreelancerRepository
      .createQueryBuilder('saveProfileFreelancer')
      .leftJoin('saveProfileFreelancer.freelancerId', 'profile')
      .where('saveProfileFreelancer.clientId = :id', { id: clientId })
      .andHaving('saveProfileFreelancer.freelancerId = :userId', { userId: id })
      .getOne();

    if (profile) {
      await this.saveProfileFreelancerRepository.update({ freelancerId: id, clientId: clientId }, { saved: saved });
      return save;
    } else {
      const status = new SaveProfileEntity();
      status.freelancerId = id;
      status.clientId = clientId;
      status.saved = saved;
      await this.saveProfileFreelancerRepository.save(status);
      return status;
    }
  }

  async getProfileSettings(
    id: number,
    clientId: number,
  ): Promise<{ profile: ProfileEntity; setting: User; status: SaveProfileEntity }> {
    const profile = await this.profileRepository.findOne({
      where: {
        id: id,
      },
      relations: ['experience', 'education', 'skills', 'category'],
    });
    if (profile) {
      const setting = await this.userRepository
        .createQueryBuilder('Setting')
        .leftJoin(`Setting.userId`, 'profile')
        .where('Setting.userId = :userId', { userId: profile?.userId })
        .getOne();
      const status = await this.saveProfileFreelancerRepository
        .createQueryBuilder('saveProfile')
        .leftJoin(`saveProfile.freelancerId`, 'profile')
        .where('saveProfile.freelancerId = :id', { id: id })
        .andHaving('saveProfile.clientId = :clientId', { clientId: clientId })
        .getOne();
      return {
        profile,
        setting,
        status,
      };
    }
    throw new NotFoundException(id);
  }
  async getProfile(alias: string): Promise<SelectQueryBuilder<ProfileEntity>> {
    return this.profileRepository
      .createQueryBuilder(alias)
      .innerJoinAndSelect(`${alias}.skills`, 'skills')
      .addSelect('skills.name')
      .innerJoinAndSelect(`${alias}.category`, 'category')
      .addSelect('category.name')
      .innerJoinAndSelect(`${alias}.userId`, 'user')
      .where(`${alias}.userId = :userId`, { userId: 'user.userId' });
  }
  async querySavedTalent(alias: string, clientId: number): Promise<SelectQueryBuilder<ProfileEntity>> {
    return (await this.getProfile(alias))
      .leftJoinAndSelect(`${alias}.id`, 'saveProfileFreelancer')
      .where(`saveProfileFreelancer.saved = :saved`, { saved: true })
      .andHaving(`saveProfileFreelancer.clientId = :clientId`, { clientId: clientId });
  }
  async queryBuilderSkills(alias: string): Promise<SelectQueryBuilder<ProfileEntity>> {
    return this.getProfile(alias);
  }

  async paginationFilter(
    query: FindUserDto,
    profile: SelectQueryBuilder<ProfileEntity>,
  ): Promise<SelectQueryBuilder<ProfileEntity>> {
    const skillQuery = query.skills ? query.skills.split(',') : null;
    const search = `%${query.search}%`;
    const category = query.category;

    profile
      .where(search ? 'skillsprofile.position LIKE :search OR skillsprofile.description LIKE :search' : 'TRUE', {
        search,
      })
      .andHaving(category ? 'category.name LIKE :category' : 'TRUE', {
        category: category,
      })
      .andHaving(query.skills ? 'skills.name IN (:skills)' : 'TRUE', {
        skills: skillQuery,
      });

    return profile;
  }

  async saveProfile(profileDto: ProfileDto): Promise<ProfileEntity> {
    try {
      const newProfile = new ProfileEntity();
      newProfile.photo = profileDto.photo;
      newProfile.position = profileDto.position;
      newProfile.price = profileDto.price;
      newProfile.englishLevel = profileDto.englishLevel;
      newProfile.description = profileDto.description;
      newProfile.category = profileDto.category;
      newProfile.education = profileDto.education;
      newProfile.experience = profileDto.experience;
      newProfile.skills = profileDto.skills;
      newProfile.userId = profileDto.userId;
      const profile = await this.profileRepository.save(newProfile);
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }
}
