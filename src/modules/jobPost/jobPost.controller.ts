import { Body, Controller, Get, Post, Param, createParamDecorator } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { JobPostDto } from './dto/jobPost.dto';
import { JobPostService } from './jobPost.service';

export const User = createParamDecorator((data, req) => {
  return req.user.id;
});
@Controller('jobPost')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @Get(':id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(Number(id));
  }

  @Get()
  getJobPostByUser(@User('userId') userId: number) {
    return this.jobPostService.getJobPostByUser(Number(userId));
  }

  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }
}
