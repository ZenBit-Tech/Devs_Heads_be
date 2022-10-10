import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';

@Controller('invite-talent')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @Post()
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto): Promise<InviteTalentEntity> {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }

  @Get(':userId')
  getInviteMessageByProfile(@Param('userId') userId: number): Promise<InviteTalentEntity> {
    return this.inviteTalentService.getInviteMessageByProfile(Number(userId));
  }
}
