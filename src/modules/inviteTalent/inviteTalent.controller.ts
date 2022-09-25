import { Body, Controller, Post, Res } from '@nestjs/common';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';

@Controller('message')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @Post('invite-talent')
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto) {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }
}
