import { PartialType } from '@nestjs/mapped-types';
import { CreateMicropaymentDto } from './create-micropayment.dto';

export class UpdateMicropaymentDto extends PartialType(CreateMicropaymentDto) {}
