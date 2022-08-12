import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { EducationEntity } from './entities/education.entities';
import { ExperiencenEntity } from './entities/experience.entities';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileSkillsEntity } from './entities/profile_skills.entity';
import { SkillsEntity } from './entities/skills.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      EducationEntity,
      ExperiencenEntity,
      ProfileSkillsEntity,
      ProfileEntity,
      SkillsEntity,
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
