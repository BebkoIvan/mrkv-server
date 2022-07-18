import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News)
    private contactRepository: Repository<News>) {}
  
  create(createTodoDto: CreateNewsDto) {
    return this.contactRepository.save(createTodoDto);
  }

  findAll() {
    return this.contactRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.contactRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateNewsDto) {
    const todo = await this.contactRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.contactRepository.update({id}, updateTodoDto);
    return await this.contactRepository.findBy({id});
  }

  async remove(id: number) {
    const todo = await this.contactRepository.findOne({where: {id}});
    if(!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.contactRepository.delete({id});
    return {deleted: true};
  }
}
