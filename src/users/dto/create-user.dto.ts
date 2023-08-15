import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}
