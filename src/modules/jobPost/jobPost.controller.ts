import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
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
  getJobPostByUser(@Param('id') userId: number) {
    return this.jobPostService.getJobPostByUser(Number(userId));
  }

  @Get()
  async getJobPosts() {
    return this.jobPostService.getJobPosts();
  }

  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }

  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() jobPostDto: JobPostDto) {
    return this.jobPostService.updatePost(id, jobPostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.jobPostService.deletePost(id);
  }
}
