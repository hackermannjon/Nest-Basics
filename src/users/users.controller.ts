import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles.enum';
import { FindAllUsersDto } from './dto/find-all-users.dto';

@Controller('users')
export class UsersController {
  /*
    GET /users or /users?role=value
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
 */
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query.role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
