import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class ResultAuthDto extends PartialType(CreateAuthDto) {
  @ApiProperty({
    description: 'token码',
  })
  access_token: string;
}
