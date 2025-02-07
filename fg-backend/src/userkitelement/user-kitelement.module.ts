import { Module } from '@nestjs/common';
import { UserKitElementService } from './user-kitelement.service';
import { UserKitElementController } from './user-kitelement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKitElement } from './entities/user-kitelement.entity';
import { User } from 'src/users/entities/user.entity';
import { KitElement } from 'src/kitelements/entities/kitelement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKitElement, User, KitElement])],
  controllers: [UserKitElementController],
  providers: [UserKitElementService],
  exports: [UserKitElementService],
})
export class UserKitElementModule {}
