import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { OfferDto } from './dto/jobOffer.dto';
import { OfferPostService } from './offer.service';

@Controller('jobProposal')
export class OfferPostController {
  constructor(private offerPostService: OfferPostService) {}

  @Post('offer')
  saveJobOffer(@Body() offerDto: OfferDto) {
    return this.offerPostService.saveJobOffer(offerDto);
  }
  @Get('job/:id/:freelancerId')
  getJobOfferByProfile(@Param('id') id: number, @Param('freelancerId') freelancerId: number) {
    return this.offerPostService.getJobOfferByProfile(Number(id), Number(freelancerId));
  }

  @Put(':jobId/:freelancerId')
  updateJobOffer(
    @Param('jobId') jobId: number,
    @Param('freelancerId') freelancerId: number,
    @Body() status: { status: boolean },
  ) {
    return this.offerPostService.updateJobOffer(Number(jobId), Number(freelancerId), status);
  }
}
