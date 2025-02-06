import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitElementsService } from './kitelements.service';
import { CreateKitElementDto } from './dto/create-kitelement.dto';
import { UpdateKitElementDto } from './dto/update-kitelement.dto';

@Controller('kit-elements')
export class KitElementsController {
  constructor(private readonly kitElementsService: KitElementsService) {}

  @Get()
  findAll() {
    return this.kitElementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitElementsService.findOne(id);
  }

  @Post()
  create(@Body() createKitElementDto: CreateKitElementDto) {
    return this.kitElementsService.create(createKitElementDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitElementDto: UpdateKitElementDto) {
    return this.kitElementsService.update(id, updateKitElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitElementsService.remove(id);
  }
}
