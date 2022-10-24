import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { OfferEntity } from 'src/entities/offer.entity';
import { OfferDto } from './dto/jobOffer.dto';
import { UpdateOfferDto } from './dto/update.offer.dto';
import { client, DateOrders, freelancer, Status } from './dto/offer.types';
import { FindContractDto } from './dto/contract.offer.dto';
import { identity } from 'rxjs';

@Injectable()
export class OfferPostService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async getJobOfferByProfile(id: number, freelancerId: number, clientId: number): Promise<OfferEntity[]> {
    const profile = await this.offerRepository
      .createQueryBuilder('getOffer')
      .where('getOffer.jobPostId = :jobId', { jobId: id })
      .andHaving('getOffer.clientId = :clientId', { clientId: clientId })
      .andHaving('getOffer.freelancerId = :id', { id: freelancerId })
      .getMany();
    if (profile) {
      return profile;
    }
    throw new NotFoundException(id);
  }
  async updateJobOfferByProfile(offerDto: OfferDto): Promise<UpdateResult> {
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
      .andWhere(`offer.clientId = ${offerDto.clientId}`)
      .execute();
    if (updateOffer) {
      return updateOffer;
    } else {
      throw new NotFoundException(offerDto.freelancerId);
    }
  }

  async saveJobOffer(offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    try {
      return await this.offerRepository.save({
        price: offerDto.price,
        startDate: offerDto.startDate,
        endDate: offerDto.endDate,
        freelancerId: { id: offerDto.freelancerId },
        clientId: offerDto.clientId,
        name: offerDto.name,
        jobPostId: offerDto.jobPostId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getJobOffer(): Promise<OfferEntity[]> {
    const allOffer = await this.offerRepository.find();
    return allOffer;
  }

  async updateJobOffer(
    jobId: number,
    freelancerId: number,
    clientId: number,
    statusOffer: UpdateOfferDto,
  ): Promise<OfferEntity[]> {
    const { status } = statusOffer;
    const existOffer = await this.offerRepository
      .createQueryBuilder('offers')
      .where('offers.jobPostId = :jobId', { jobId: jobId })
      .andHaving('offers.clientId = :clientId', { clientId: clientId })
      .andHaving('offers.freelancerId = :id', { id: freelancerId })
      .getMany();

    if (existOffer) {
      existOffer[0].status = status;
      return await this.offerRepository.save(existOffer);
    }
    throw new NotFoundException(jobId);
  }

  async getOfferAccepted(userId: number, role: string, query: FindContractDto): Promise<OfferEntity[]> {
    const category = query.status;
    console.log(category);
    const date = query.date as DateOrders;
    if (role === freelancer) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    } else if (role === client) {
      try {
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
        return contract;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateExpiredStatus(updateOfferExpired: UpdateOfferDto): Promise<UpdateResult> {
    const { status, id } = updateOfferExpired;
    try {
      return await this.offerRepository
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
