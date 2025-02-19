import { Module } from '@nestjs/common';
import { MicropaymentsService } from './micropayments.service';
import { MicropaymentsController } from './micropayments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Micropayment } from './entities/micropayment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Micropayment])],
  controllers: [MicropaymentsController],
  providers: [MicropaymentsService],
  exports: [MicropaymentsService],
})
export class MicropaymentsModule {}
