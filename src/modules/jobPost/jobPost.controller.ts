import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { JobPostDto } from './dto/jobPost.dto';
import { JobPostService } from './jobPost.service';

@Controller('jobPost')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @Get('search')
  searchJobByTitle(@Query() query: object) {
    return this.jobPostService.searchJobByTitle(query);
  }

  @Get(':id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(Number(id));
  }

  @Get('user/:id')
  getJobPostByUser(@Param('id') userId: number) {
    return this.jobPostService.getJobPostByUser(Number(userId));
  }

  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }
}
