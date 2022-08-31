import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalPostEntity } from 'src/entities/propasal.entity';
import { ProposalPostDto } from './dto/proposalPost.dto';

@Injectable()
export class ProposalPostService {
  constructor(
    @InjectRepository(ProposalPostEntity)
    private proposalPostRepository: Repository<ProposalPostEntity>,
  ) {}

  async saveProposalPost(proposalPostDto: ProposalPostDto) {
    try {
      console.log(proposalPostDto);
      const newMessage = new ProposalPostDto();
      newMessage.id = proposalPostDto.id;
      newMessage.price = proposalPostDto.price;
      newMessage.message = proposalPostDto.message;
      newMessage.jobPost = proposalPostDto.jobPost;
      const message = await this.proposalPostRepository.save(newMessage);
      console.log(message);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
