import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact)
    private contactRepository: Repository<Contact>) {}
  
  create(createTodoDto: CreateContactDto) {
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

  async update(id: number, updateTodoDto: UpdateContactDto) {
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
