import { Module } from '@nestjs/common';
import { UserKitElementConfigService } from './UserKitElementConfig.service';
import { UserKitElementConfigController } from './UserKitElementConfig.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKitElementConfig } from './entities/userkitelementconfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKitElementConfig])],
  controllers: [UserKitElementConfigController],
  providers: [UserKitElementConfigService],
  exports: [UserKitElementConfigService],
})
export class UserKitElementConfigModule {}
