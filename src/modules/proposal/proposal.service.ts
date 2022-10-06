import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getProposalPost(userId: number, jobId: number) {
    const proposalByUser = await this.proposalPostRepository.findOne({
      where: { userId: userId, jobPost: jobId },
    });
    if (proposalByUser) {
      return proposalByUser;
    }
    throw new NotFoundException(userId);
  }

  async getProposalClient(userId: number) {
    const proposalByClient = await this.proposalPostRepository.findOne({
      where: { userIdClient: userId },
    });
    console.log(proposalByClient);
    if (proposalByClient) {
      return proposalByClient;
    }
    throw new NotFoundException(userId);
  }

  async saveProposalPost(proposalPostDto: ProposalPostDto) {
    try {
      const newMessage = new ProposalPostEntity();
      newMessage.id = proposalPostDto.id;
      newMessage.price = proposalPostDto.price;
      newMessage.message = proposalPostDto.message;
      newMessage.jobPost = proposalPostDto.jobPost;
      newMessage.userId = proposalPostDto.userId;
      newMessage.userIdClient = proposalPostDto.userIdClient;
      const message = await this.proposalPostRepository.save(newMessage);
      console.log(message);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
