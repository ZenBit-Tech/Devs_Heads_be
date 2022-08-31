import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { JobPostDto } from './dto/jobPost.dto';
import { JobPostService } from './jobPost.service';

@Controller('jobPost')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @Get(':id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(Number(id));
  }

  @Get('user/:id')
  getJobPostByUser(@Param('id') id: number) {
    return this.jobPostService.getJobPostByUser(Number(id));
  }

  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }
}
