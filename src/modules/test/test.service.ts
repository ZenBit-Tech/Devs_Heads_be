import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../../entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly repository: Repository<Test>,
  ) {}
  findAll(): Promise<Test[]> {
    return this.repository.createQueryBuilder('test').getMany();
  }
}
