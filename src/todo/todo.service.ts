import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo)
    private todoRepository: Repository<Todo>,) {}
  
  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.todoRepository.update({id}, updateTodoDto);
    return await this.todoRepository.findBy({id});
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.todoRepository.delete({id});
    return {deleted: true};
  }
}
