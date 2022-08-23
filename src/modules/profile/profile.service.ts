import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities/profile/category.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const allCategories = await this.categoryRepository.find();
    return allCategories;
  }

  async getAllSkills(): Promise<SkillsEntity[]> {
    const allSkills = await this.skillsRepository.find();
    return allSkills;
  }

  async getProfileSettings(id: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        id: id,
      },
      relations: ['experience', 'education', 'skills', 'category'],
    });
    if (profile) {
      return profile;
    }
    throw new NotFoundException(id);
  }

  async saveProfile(profileDto: ProfileDto) {
    try {
      console.log(profileDto);
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
      const profile = await this.profileRepository.save(newProfile);
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }
}
