import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfferEntity } from 'src/entities/offer.entity';
import { UpdateResult } from 'typeorm';
import { OfferDto } from './dto/jobOffer.dto';
import { OfferPostService } from './offer.service';

@ApiTags('Job offer')
@Controller('jobOffer')
export class OfferPostController {
  constructor(private offerPostService: OfferPostService) {}

  @ApiOperation({ summary: 'Create job offer' })
  @ApiResponse({ status: 200, type: OfferEntity })
  @Post('offer')
  saveJobOffer(@Body() offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    return this.offerPostService.saveJobOffer(offerDto);
  }

  @ApiOperation({ summary: 'Get job offer by ID' })
  @ApiResponse({ status: 200, type: OfferEntity })
  @Get('job/:id/:freelancerId')
  getJobOfferByProfile(@Param('id') id: number, @Param('freelancerId') freelancerId: number): Promise<OfferEntity> {
    return this.offerPostService.getJobOfferByProfile(Number(id), Number(freelancerId));
  }

  @ApiOperation({ summary: 'Update job offer by ID' })
  @ApiResponse({ status: 200, type: OfferEntity })
  @Put(':jobId/:freelancerId')
  updateJobOffer(
    @Param('jobId') jobId: number,
    @Param('freelancerId') freelancerId: number,
    @Body() status: { status: boolean },
  ): Promise<{ status: boolean }> {
    return this.offerPostService.updateJobOffer(Number(jobId), Number(freelancerId), status);
  }

  @ApiOperation({ summary: 'Get all job offers' })
  @ApiResponse({ status: 200, type: [OfferEntity] })
  @Get('job')
  getJobOffer(): Promise<OfferEntity[]> {
    return this.offerPostService.getJobOffer();
  }
}
