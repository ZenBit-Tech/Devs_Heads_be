import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/profile/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperienceEntity } from 'src/entities/profile/experience.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, CategoryEntity, EducationEntity, ExperienceEntity, SkillsEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
