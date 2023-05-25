import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from '../../app/repositories/tag.repository';

@Injectable()
export class TagsService {
  constructor(private tagRepository: TagRepository) {}

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findAll() {
    return this.tagRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
