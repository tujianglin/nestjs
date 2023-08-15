import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: '新建用户',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: '用户列表',
  })
  @Get()
  findAll() {
    this.logger.error(111);
    return this.usersService.findAll();
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
