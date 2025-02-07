import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserKitElementConfigService } from './UserKitElementConfig.service';
import { CreateUserKitElementConfigDto } from './dto/create-UserKitElementConfig.dto';
import { UpdateUserKitElementConfigDto } from './dto/update-UserKitElementConfig.dto';

@Controller('user-kitelementconfig')
export class UserKitElementConfigController {
  constructor(private readonly userKitElementConfigService: UserKitElementConfigService) {}

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userKitElementConfigService.findOne(userId);
  }

  @Post()
  create(@Body() createUserKitElementConfigDto: CreateUserKitElementConfigDto) {
    return this.userKitElementConfigService.create(createUserKitElementConfigDto);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserKitElementConfigDto: UpdateUserKitElementConfigDto) {
    return this.userKitElementConfigService.update(userId, updateUserKitElementConfigDto);
  }
}
