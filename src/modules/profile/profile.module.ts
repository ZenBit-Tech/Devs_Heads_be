import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/profile/category.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperiencenEntity } from 'src/entities/profile/experience.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { ProfileSkillsEntity } from 'src/entities/profile/profile_skills.entity';
import { SkillsEntity } from 'src/entities/profile/skills.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      CategoryEntity,
      EducationEntity,
      ExperiencenEntity,
      ProfileSkillsEntity,
      SkillsEntity,
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
