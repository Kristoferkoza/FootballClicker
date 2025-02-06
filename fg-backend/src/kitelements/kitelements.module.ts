import { Module } from '@nestjs/common';
import { KitElementsService } from './kitelements.service';
import { KitElementsController } from './kitelements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitElement } from './entities/kitelement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KitElement])],
  controllers: [KitElementsController],
  providers: [KitElementsService],
  exports: [KitElementsService]
})
export class KitElementsModule {}
