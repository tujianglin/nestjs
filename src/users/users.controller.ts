import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @ApiOperation({
    summary: '新建用户',
  })
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch {
      throw new HttpException(
        { message: '用户名已存在' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '用户列表',
  })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: '用户详情',
  })
  @Get(':id')
  findOne(@Param('id') username: string) {
    return this.usersService.findOne(username);
  }

  @ApiOperation({
    summary: '编辑用户',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
