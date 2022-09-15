import { Injectable } from '@nestjs/common';
import { inviteTalentEntity } from 'src/entities/inviteTalent';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';

@Injectable()
export class InviteTalentService {
  constructor(private InviteTalent: inviteTalentEntity) {}

  async saveInviteMessage(InviteTalentDto: InviteTalentDto) {
    try {
      const newMessage = new inviteTalentEntity();
      newMessage.message = InviteTalentDto.message;
      newMessage.jobTitle = InviteTalentDto.jobTitle;
      // newMessage.userId = InviteTalentDto.userId;
      const invitation = await this.InviteTalent.createQueryBuilder().insert().
    } catch (error) {
      
    }
  }
}
