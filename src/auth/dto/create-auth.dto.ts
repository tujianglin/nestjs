import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '密码',
  })
  password: string;
}
