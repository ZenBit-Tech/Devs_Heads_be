import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { inviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { Repository } from 'typeorm';

@Injectable()
export class InviteTalentService {
  constructor(
    @InjectRepository(inviteTalentEntity)
    private inviteTalentRepository: Repository<inviteTalentEntity>,
  ) {}

  async saveInviteMessage(InviteTalentDto: InviteTalentDto) {
    console.log(InviteTalentDto);
    try {
      const newMessage = new inviteTalentEntity();
      newMessage.message = InviteTalentDto.message;
      newMessage.userId = InviteTalentDto.userId;
      newMessage.jobTitle = InviteTalentDto.jobTitle;
      const invitation = await this.inviteTalentRepository.save(newMessage);
      console.log(invitation);
      return invitation;
    } catch (e) {
      console.log(e);
    }
  }
}
