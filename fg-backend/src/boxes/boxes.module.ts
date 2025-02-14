import { Module } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Box])],
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [BoxesService],
})
export class BoxesModule {}
