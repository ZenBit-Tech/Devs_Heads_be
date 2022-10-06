import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { Repository } from 'typeorm';

@Injectable()
export class InviteTalentService {
  constructor(
    @InjectRepository(InviteTalentEntity)
    private inviteTalentRepository: Repository<InviteTalentEntity>,
  ) {}

  async saveInviteMessage(InviteTalentDto: InviteTalentDto) {
    try {
      const newMessage = new InviteTalentEntity();
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
  async getInviteMessage(userId: number) {
    const talent = await this.inviteTalentRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (talent) {
      return talent;
    }
    throw new NotFoundException(userId);
  }
}
