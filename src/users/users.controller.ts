import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = createUserDto.password;
    userEntity.id = uuid();

    this.usersService.create(userEntity);

    return {
      user: new ListUserDto(userEntity.id, userEntity.name),
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll() {
    const usersList = await this.usersService.findAll();

    return usersList;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.usersService.findOne(id);
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userDeleted = await this.usersService.remove(id);
    return {
      message: 'User deleted successfully',
      user: userDeleted,
    };
  }
}
