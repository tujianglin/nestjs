import { PartialType } from '@nestjs/swagger';
import { CreateCompDto } from './create-comp.dto';

export class UpdateCompDto extends PartialType(CreateCompDto) {}
