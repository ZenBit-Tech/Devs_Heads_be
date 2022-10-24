import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { OfferEntity } from 'src/entities/offer.entity';
import { OfferDto } from './dto/jobOffer.dto';
import { UpdateOfferDto } from './dto/update.offer.dto';
import { client, DateOrders, freelancer, Status } from './dto/offer.types';
import { FindContractDto } from './dto/contract.offer.dto';

@Injectable()
export class OfferPostService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async getJobOfferByProfile(id: number, freelancerId: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne({
      where: {
        jobPostId: id,
        freelancerId: { id: freelancerId },
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
        freelancerId: { id: offerDto.freelancerId },
        jobPostId: offerDto.jobPostId,
        clientId: offerDto.clientId,
      },
    });
    console.log(existOffer);
    if (existOffer) {
      const updateOffer = await this.offerRepository
        .createQueryBuilder('offer')
        .update(OfferEntity)
        .set({
          price: offerDto.price,
          startDate: offerDto.startDate,
          endDate: offerDto.endDate,
          name: offerDto.name,
        })
        .where(`offer.freelancerId = ${offerDto.freelancerId}`)
        .andWhere(`offer.jobPostId = ${offerDto.jobPostId}`)
        .execute();
      return updateOffer;
    } else {
      return await this.offerRepository.save({
        price: offerDto.price,
        startDate: offerDto.startDate,
        endDate: offerDto.endDate,
        freelancerId: { id: offerDto.freelancerId },
        clientId: offerDto.clientId,
        name: offerDto.name,
        jobPostId: offerDto.jobPostId,
      });
    }
  }

  async getJobOffer(): Promise<OfferEntity[]> {
    const allOffer = await this.offerRepository.find();
    return allOffer;
  }

  async updateJobOffer(jobId: number, freelancerId: number, statusOffer: UpdateOfferDto): Promise<{ status: string }> {
    const { status } = statusOffer;
    if (jobId && freelancerId) {
      await this.offerRepository.update({ freelancerId: { id: freelancerId }, jobPostId: jobId }, { status: status });
      return statusOffer;
    }
    throw new NotFoundException(jobId);
  }

  async getOfferAccepted(userId: number, role: string, query: FindContractDto) {
    const category = query.status;
    console.log(category);
    const date = query.date as DateOrders;
    if (role === freelancer) {
      const contract = await this.offerRepository
        .createQueryBuilder('freelancer')
        .leftJoinAndSelect('freelancer.jobPostId', 'job_post_entity')
        .leftJoinAndSelect('job_post_entity.userId', 'user')
        .leftJoinAndSelect('user.clientSetting', 'client_settings_entity')
        .where(`freelancer.freelancerId = ${userId} AND freelancer.status  != pending`)
        .andHaving(category ? 'freelancer.status LIKE :status AND freelancer.status  != :declined ' : 'TRUE', {
          status: category,
          declined: 'rejected',
        })
        .andHaving('client.status != :pending', { pending: 'pending' })
        .orderBy('freelancer.startDate', date === 'ASC' ? 'ASC' : 'DESC')
        .getMany();
      return contract;
    } else if (role === client) {
      const contract = await this.offerRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.freelancerId', 'profile')
        .leftJoinAndSelect('profile.userId', 'user')
        .leftJoinAndSelect('client.jobPostId', 'job_post_entity')
        .where(`client.clientId = ${userId}`)
        .andHaving(category ? 'client.status LIKE :status AND client.status  != :declined' : 'TRUE', {
          status: category,
          declined: 'rejected',
        })
        .andHaving('client.status != :pending', { pending: 'pending' })
        .orderBy('client.startDate', date === 'ASC' ? 'ASC' : 'DESC')
        .getMany();
      console.log(contract);
      return contract;
    }
  }

  async updateExpiredStatus(updateOfferExpired: UpdateOfferDto) {
    const { status, id } = updateOfferExpired;
    try {
      await this.offerRepository
        .createQueryBuilder('contract')
        .update(OfferEntity)
        .set({ status: status })
        .where({ id: In(id) })
        .execute();
    } catch (error) {
      throw new NotFoundException(id);
    }
  }
}
