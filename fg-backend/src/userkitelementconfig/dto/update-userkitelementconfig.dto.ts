import { PartialType } from '@nestjs/mapped-types';
import { CreateUserKitElementConfigDto } from './create-UserKitElementConfig.dto';

export class UpdateUserKitElementConfigDto extends PartialType(CreateUserKitElementConfigDto) {}
