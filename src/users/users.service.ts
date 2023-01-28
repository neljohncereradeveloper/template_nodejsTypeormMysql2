import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_REPOSITORY } from './../constants';
import { Users } from './entities/user.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne(id).catch((err) => {
      if (err) {
        throw new InternalServerErrorException();
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByAge(age: number): Promise<Users[]> {
    const users: Users[] = await this.usersRepository.find({ where: { age } });

    if (users.length === 0) {
      throw new NotFoundException('No data');
    }
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<Users | undefined> {
    const user = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Users | undefined> {
    const user = await this.findById(id);

    user.firstName = updateUserDto.firstName;
    user.middleName = updateUserDto.middleName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;

    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<Users | undefined> {
    const user = await this.findById(id);

    return await this.usersRepository.remove(user);
  }
}
