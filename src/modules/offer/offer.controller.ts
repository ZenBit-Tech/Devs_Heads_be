import { Body, Controller, Post, Get, Param, Put, Patch, Query } from '@nestjs/common';
import { OfferEntity } from 'src/entities/offer.entity';
import { UpdateResult } from 'typeorm';
import { FindContractDto } from './dto/contract.offer.dto';
import { OfferDto } from './dto/jobOffer.dto';
import { UpdateOfferDto } from './dto/update.offer.dto';
import { OfferPostService } from './offer.service';

@Controller('jobOffer')
export class OfferPostController {
  constructor(private offerPostService: OfferPostService) {}

  @Post('offer')
  saveJobOffer(@Body() offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
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
    @Body() status: UpdateOfferDto,
  ) {
    return this.offerPostService.updateJobOffer(Number(jobId), Number(freelancerId), status);
  }

  @Get('job')
  getJobOffer(): Promise<OfferEntity[]> {
    return this.offerPostService.getJobOffer();
  }

  @Put()
  updateExpiredStatus(@Body() updateOfferDto: UpdateOfferDto) {
    return this.offerPostService.updateExpiredStatus(updateOfferDto);
  }

  @Get('offer/:userId/:role')
  getOfferAccepted(
    @Param('userId') id: string,
    @Param('role') role: string,
    @Query() userQuery: FindContractDto,
  ): Promise<OfferEntity[]> {
    return this.offerPostService.getOfferAccepted(Number(id), role, userQuery);
  }
}
