import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';

@Controller('invite-talent')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @Post()
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto) {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }
  @Get(':id')
  getInviteMessage(@Param('id') userId: number) {
    return this.inviteTalentService.getInviteMessage(Number(userId));
  }
}
