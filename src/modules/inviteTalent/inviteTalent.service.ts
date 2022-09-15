import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { inviteTalentEntity } from 'src/entities/inviteTalent';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { Repository } from 'typeorm';

@Injectable()
export class InviteTalentService {
  constructor(
    @InjectRepository(inviteTalentEntity)
    private inviteTalentRepository: Repository<inviteTalentEntity>,
  ) {}

  async saveInviteMessage(InviteTalentDto: InviteTalentDto) {
    try {
      const newMessage = new inviteTalentEntity();
      newMessage.message = InviteTalentDto.message;
      newMessage.jobTitle = InviteTalentDto.jobTitle;
      // newMessage.userId = InviteTalentDto.userId;
      const invitation = await this.inviteTalentRepository.save(newMessage);
      return invitation;
    } catch (e) {
      console.log(e);
    }
  }
}
