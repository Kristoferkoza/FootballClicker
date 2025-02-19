import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicropaymentsService } from './micropayments.service';
import { CreateMicropaymentDto } from './dto/create-micropayment.dto';
import { UpdateMicropaymentDto } from './dto/update-micropayment.dto';

@Controller('micropayments')
export class MicropaymentsController {
  constructor(private readonly micropaymentsService: MicropaymentsService) {}

  @Post()
  create(@Body() createMicropaymentDto: CreateMicropaymentDto) {
    return this.micropaymentsService.create(createMicropaymentDto);
  }

  @Get()
  findAll() {
    return this.micropaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.micropaymentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicropaymentDto: UpdateMicropaymentDto) {
    return this.micropaymentsService.update(id, updateMicropaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.micropaymentsService.remove(id);
  }
}
