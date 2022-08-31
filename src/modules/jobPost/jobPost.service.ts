import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { JobPostDto } from './dto/jobPost.dto';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPostEntity)
    private jobPostRepository: Repository<JobPostEntity>,
  ) {}

  async getJobPost(id: number) {
    const job = await this.jobPostRepository.findOne({
      where: {
        id: id,
      },
      relations: ['jobSkills', 'jobCategory'],
    });
    if (job) {
      return job;
    }
    throw new NotFoundException(id);
  }

  async getJobPostByUser(userId: number) {
    const jobByUser = await this.jobPostRepository.findOne({
      where: { userId: userId },
    });
    if (jobByUser) {
      return jobByUser;
    }
    throw new NotFoundException(userId);
  }

  async saveJobPost(jobPostDto: JobPostDto) {
    try {
      console.log(jobPostDto);
      const newJob = new JobPostEntity();
      newJob.jobTitle = jobPostDto.jobTitle;
      newJob.jobCategory = jobPostDto.jobCategory;
      newJob.jobSkills = jobPostDto.jobSkills;
      newJob.fromHourRate = jobPostDto.fromHourRate;
      newJob.toHourRate = jobPostDto.toHourRate;
      newJob.jobDuration = jobPostDto.jobDuration;
      newJob.jobDescription = jobPostDto.jobDescription;
      newJob.dateTime = jobPostDto.dateTime;
      newJob.userId = jobPostDto.userId;
      const job = await this.jobPostRepository.save(newJob);
      console.log(job);
      return job;
    } catch (error) {
      console.log(error);
    }
  }
}
