import { Injectable } from '@nestjs/common';
import { CreateUserKitElementConfigDto } from './dto/create-UserKitElementConfig.dto';
import { UpdateUserKitElementConfigDto } from './dto/update-UserKitElementConfig.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserKitElementConfig } from './entities/userkitelementconfig.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserKitElementConfigService {
  constructor(
    @InjectRepository(UserKitElementConfig)
    private readonly configRepository: Repository<UserKitElementConfig>
  ) {}

  async findOne(userId: string) {
    let config = await this.configRepository.findOne({ where: { userId: userId } });
    if (!config) {
      let createUserKitElementConfigDto: CreateUserKitElementConfigDto = {
        userId: userId,
        tshirtId: null,
        shortId: null,
        sockId: null,
        bootId: null,
        bonus: 0,
      }
      config = this.create(createUserKitElementConfigDto)
    }
    return config;
  }

  create(createUserKitElementConfigDto: CreateUserKitElementConfigDto) {
    const config = this.configRepository.create(createUserKitElementConfigDto);
    this.configRepository.save(config)
    return config;
  }

  async update(userId: string, updateUserKitElementConfigDto: UpdateUserKitElementConfigDto) {
    const config = await this.findOne(userId);
    return this.configRepository.save({ ...config, ...updateUserKitElementConfigDto })
  }
}
