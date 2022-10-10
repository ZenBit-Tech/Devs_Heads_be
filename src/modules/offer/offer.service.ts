import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { OfferEntity } from 'src/entities/offer.entity';
import { OfferDto } from './dto/jobOffer.dto';

@Injectable()
export class OfferPostService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async getJobOfferByProfile(id: number, freelancerId: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne({
      where: {
        jopPostId: id,
        freelancerId: freelancerId,
      },
    });
    if (offer) {
      return offer;
    }
    throw new NotFoundException(id);
  }

  async saveJobOffer(offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    const existOffer = await this.offerRepository.findOne({
      where: {
        freelancerId: offerDto.freelancerId,
        jopPostId: offerDto.jopPostId,
      },
    });
    if (existOffer) {
      const offerUpdate = await this.offerRepository.update(
        { freelancerId: offerDto.freelancerId, jopPostId: offerDto.jopPostId },
        { price: offerDto.price, startDate: offerDto.startDate, endDate: offerDto.endDate, name: offerDto.name },
      );
      return offerUpdate;
    } else {
      const newOffer = new OfferEntity();
      newOffer.price = offerDto.price;
      newOffer.startDate = offerDto.startDate;
      newOffer.endDate = offerDto.endDate;
      newOffer.freelancerId = offerDto.freelancerId;
      newOffer.name = offerDto.name;
      newOffer.jopPostId = offerDto.jopPostId;
      const offer = await this.offerRepository.save(newOffer);
      return offer;
    }
  }

  async updateJobOffer(
    jobId: number,
    freelancerId: number,
    statusOffer: { status: boolean },
  ): Promise<{ status: boolean }> {
    const { status } = statusOffer;
    if (jobId && freelancerId) {
      await this.offerRepository.update({ freelancerId: freelancerId, jopPostId: jobId }, { status: status });
      return statusOffer;
    }
    throw new NotFoundException(jobId);
  }
}
