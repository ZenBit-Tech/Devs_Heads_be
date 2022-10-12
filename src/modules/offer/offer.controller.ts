import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { OfferEntity } from 'src/entities/offer.entity';
import { UpdateResult } from 'typeorm';
import { OfferDto } from './dto/jobOffer.dto';
import { OfferPostService } from './offer.service';

@Controller('jobOffer')
export class OfferPostController {
  constructor(private offerPostService: OfferPostService) {}

  @Post('offer')
  saveJobOffer(@Body() offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    return this.offerPostService.saveJobOffer(offerDto);
  }
  @Get('job/:id/:freelancerId')
  getJobOfferByProfile(@Param('id') id: number, @Param('freelancerId') freelancerId: number): Promise<OfferEntity> {
    return this.offerPostService.getJobOfferByProfile(Number(id), Number(freelancerId));
  }

  @Put(':jobId/:freelancerId')
  updateJobOffer(
    @Param('jobId') jobId: number,
    @Param('freelancerId') freelancerId: number,
    @Body() status: { status: boolean },
  ): Promise<{ status: boolean }> {
    return this.offerPostService.updateJobOffer(Number(jobId), Number(freelancerId), status);
  }

  @Get('job')
  getJobOffer(): Promise<OfferEntity[]> {
    return this.offerPostService.getJobOffer();
  }
}
