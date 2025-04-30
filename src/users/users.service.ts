import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const usersEntity = new UserEntity();

    usersEntity.name = createUserDto.name;
    usersEntity.email = createUserDto.email;
    usersEntity.password = createUserDto.password;

    return this.userRepository.save(usersEntity);
  }

  async findByEmail(email: string) {
    const emailCheck = await this.userRepository.findOne({ where: { email } });
    return emailCheck;
  }

  async findAll() {
    const users = await this.userRepository.find();
    const listUsers = users.map((user) => new ListUserDto(user.id, user.name));
    return listUsers;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete({ id });
  }
}
