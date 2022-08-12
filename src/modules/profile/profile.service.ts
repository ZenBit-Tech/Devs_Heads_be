import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { EducationEntity } from './entities/education.entities';
import { ExperiencenEntity } from './entities/experience.entities';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileSkillsEntity } from './entities/profile_skills.entity';
import { SkillsEntity } from './entities/skills.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(EducationEntity)
    private educationRepository: Repository<EducationEntity>,
    @InjectRepository(ExperiencenEntity)
    private experienceRepository: Repository<ExperiencenEntity>,
    @InjectRepository(ProfileSkillsEntity)
    private profileSkillsRepository: Repository<ProfileSkillsEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
  ) {}
}
