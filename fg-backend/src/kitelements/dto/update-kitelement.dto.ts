import { PartialType } from '@nestjs/mapped-types';
import { CreateKitElementDto } from './create-kitelement.dto';

export class UpdateKitElementDto extends PartialType(CreateKitElementDto) {}
