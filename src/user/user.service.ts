import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private userRepository: Repository<User>) {}
  
  create(createTodoDto: CreateUserDto) {
    return this.userRepository.save(createTodoDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.userRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateUserDto) {
    const todo = await this.userRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.userRepository.update({id}, updateTodoDto);
    return await this.userRepository.findBy({id});
  }

  async remove(id: number) {
    const todo = await this.userRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.userRepository.delete({id});
    return {deleted: true};
  }
}
