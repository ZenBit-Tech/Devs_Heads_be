import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SettingsInfoDto } from './dto/settingsInfo.dto';

@Injectable()
export class SettingsInfoService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveUserSettings(settingsInfoDto: SettingsInfoDto) {
    const { email } = settingsInfoDto;

    const findedUser = await this.userRepository.findOneBy({ email: email });

    if (!findedUser)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not find user with ${email}`,
        },
        HttpStatus.NOT_FOUND,
      );

    return await this.userRepository.save({ ...findedUser, ...settingsInfoDto });
  }
}
