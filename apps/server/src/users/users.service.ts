import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({ name, email }: RegisterInput) {
    const newUser = await this.userRepository.create({
      name,
      email,
      xp: 0,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      // TODO: handle error
    }
  }

  async findAll() {
    return this.userRepository.find({ relations: ['tasks'] });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return user;
    } catch (err) {
      return undefined;
    }
  }
}
