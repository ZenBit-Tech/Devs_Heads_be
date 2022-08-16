import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getAllCategories(): Promise<CategoryEntity[]> {
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
      .leftJoinAndSelect('profile.educations', 'educations')
      .leftJoinAndSelect('profile.category', 'category')
      .leftJoinAndSelect('profile.experience', 'experience')
      .leftJoinAndSelect('profile.profileSkills', 'profileSkills')
      .where('profile.id = :id', { id })
      .getOne();

    return profileSettings;
  }

  async saveProfile(profileDto: ProfileDto) {
    try {
      console.log(profileDto);
      const newProfile = new ProfileEntity();
      newProfile.photo = profileDto.photo;
      newProfile.price = profileDto.price;
      newProfile.englishLevel = profileDto.englishLevel;
      newProfile.availible_hours_peer_week = profileDto.availible_hours_peer_week;
      newProfile.hour_rate = profileDto.hour_rate;
      newProfile.description = profileDto.description;
      newProfile.categoryId.id = profileDto.categoryId;
      newProfile.educations[0].id = profileDto.educations[0];
      newProfile.experience[0].id = profileDto.experience[0];
      newProfile.profileSkills[0].id = profileDto.profileSkills[0];
      const profile = await this.profileRepository.save(newProfile);
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }
}
