import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';

@Controller('invite-talent')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @Get(':id')
  getInviteMessageById(@Param('id') id: number): Promise<InviteTalentEntity> {
    return this.inviteTalentService.getInviteMessageById(Number(id));
  }

  @Get('/freelancer/:id')
  getInviteMessageByProfile(@Param('id') id: number): Promise<InviteTalentEntity[]> {
    return this.inviteTalentService.getInviteMessageByProfile(Number(id));
  }

  @Get()
  getAllInviteMessages(): Promise<InviteTalentEntity[]> {
    return this.inviteTalentService.getAllInviteMessages();
  }

  @Post()
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto): Promise<InviteTalentEntity> {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }
}
