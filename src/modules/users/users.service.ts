import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.users.findOneBy({ email });
  }
  async save(data): Promise<User | null> {
    return this.users.save(data);
  }
}
