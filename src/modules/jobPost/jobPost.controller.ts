import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { JobPostDto } from './dto/jobPost.dto';
import { JobPostService } from './jobPost.service';

@Controller('jobPost')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @Get(':id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(Number(id));
  }

  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }
}
