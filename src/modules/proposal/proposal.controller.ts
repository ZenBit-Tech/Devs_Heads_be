import { Body, Controller, Post } from '@nestjs/common';
import { ProposalPostDto } from './dto/proposalPost.dto';
import { ProposalPostService } from './proposal.service';

@Controller('jobProposal')
export class ProposalPostController {
  constructor(private proposalPostService: ProposalPostService) {}

  @Post()
  saveProposalPost(@Body() proposalPostDto: ProposalPostDto) {
    return this.proposalPostService.saveProposalPost(proposalPostDto);
  }
}
