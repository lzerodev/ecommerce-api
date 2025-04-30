import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      user: new ListUserDto(user.id, user.name),
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll() {
    const usersList = await this.usersService.findAll();

    return usersList;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    return user;
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    return {
      user: new ListUserDto(user.id, user.name),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
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
