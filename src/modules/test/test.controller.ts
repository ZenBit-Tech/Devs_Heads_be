import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from '../../entities/test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get()
  getAll(): Promise<Test[]> {
    return this.service.findAll();
  }
}
