import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inviteTalentEntity } from 'src/entities/inviteTalent';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';
import { InviteTalentController } from 'src/modules/inviteTalent/inviteTalent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([inviteTalentEntity, JobPostEntity])],
  providers: [InviteTalentService],
  controllers: [InviteTalentController],
})
export class InviteTalentModule {}
