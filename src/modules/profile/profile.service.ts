import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities/profile/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperiencenEntity } from 'src/entities/profile/experience.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { ProfileSkillsEntity } from 'src/entities/profile/profile_skills.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(EducationEntity)
    private educationRepository: Repository<EducationEntity>,
    @InjectRepository(ExperiencenEntity)
    private experienceRepository: Repository<ExperiencenEntity>,
    @InjectRepository(ProfileSkillsEntity)
    private profileSkillsRepository: Repository<ProfileSkillsEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
  ) {}

  async getAllCategories() {
    const allCategories = await this.categoryRepository.find();
    return allCategories;
  }

  async getAllSkils() {
    const allSkills = await this.skillsRepository.find();
    return allSkills;
  }

  async getProfileSettings(id: number) {
    const profileSettings = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.photo', 'photo')
      .leftJoinAndSelect('profile.position', 'position')
      .leftJoinAndSelect('profile.price', 'price')
      .leftJoinAndSelect('profile.englishLevel', 'englishLevel')
      .leftJoinAndSelect('profile.availible_hours_peer_week', 'availible_hours_peer_week')
      .leftJoinAndSelect('profile.hour_rate', 'hour_rate')
      .leftJoinAndSelect('profile.description', 'description')
      .leftJoinAndSelect('profile.category_id', 'category_id')
      .where('profile.id= :id', { id })
      .getOne();

    return profileSettings;
  }

  async saveProfile(profileDto: ProfileDto) {
    const profile = await this.profileRepository.save(profileDto);
    return profile;
  }
}
