import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { EnglishLevelEntity } from './entities/english_level.entity';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileSkillsEntity } from './entities/profile_skills.entity';
import { SkillsEntity } from './entities/skills.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, EnglishLevelEntity, ProfileSkillsEntity, ProfileEntity, SkillsEntity]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
