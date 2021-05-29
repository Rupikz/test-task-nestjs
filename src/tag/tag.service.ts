import { Injectable } from '@nestjs/common';
import { DeletedStatus } from 'src/libs/common/constants';
import { ParamsIntDto } from 'src/libs/common/dtos';
import { TagNameExistException } from 'src/libs/common/exceptions';
import { TagEntity, TagRepository } from 'src/libs/models/tag';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EditTagDto } from './dtos/request/edit-tag.dto';
import { TagPageOptionsDto } from './dtos/request/tag-page-options.dto';
import { TagDto } from './dtos/response/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  @Transactional()
  async create(data: Partial<TagEntity>): Promise<TagDto> {
    return new TagDto(await this.tagRepository.save(this.tagRepository.create({ ...data })));
  }

  async getMin(findData: FindConditions<TagEntity>[] | FindConditions<TagEntity>): Promise<TagEntity> {
    return await this.tagRepository.findOne({ where: findData });
  }

  async find(findData: FindConditions<TagEntity>[] | FindConditions<TagEntity>): Promise<TagEntity[]> {
    return await this.tagRepository.find({ where: findData });
  }

  @Transactional()
  async edit(params: ParamsIntDto, data: EditTagDto): Promise<void> {
    const tag = await this.getMin({ name: data.name, deleted: DeletedStatus.NOT_DELETED });
    if (tag) {
      throw new TagNameExistException();
    }
    await this.tagRepository.update({ id: params.id }, { ...data, updatedAt: new Date() });
  }

  async findAll(pageOptionsDto: TagPageOptionsDto): Promise<[TagEntity[], number]> {
    const queryBuilder = this.tagRepository.createQueryBuilder('tags');
    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.pageSize).orderBy(`${queryBuilder.alias}.${pageOptionsDto.sort}`, pageOptionsDto.order);
    const findData = <FindConditions<TagEntity>>{ deleted: DeletedStatus.NOT_DELETED };
    queryBuilder.where(findData).leftJoinAndSelect('tags.user', 'user', 'user.deleted = :deleted', { deleted: DeletedStatus.NOT_DELETED });
    return queryBuilder.getManyAndCount();
  }

  async findOneWithCreator(findData: FindConditions<TagEntity>): Promise<TagEntity> {
    const queryBuilder = this.tagRepository.createQueryBuilder('tags');
    queryBuilder.where(findData).leftJoinAndSelect('tags.user', 'user', 'user.deleted = :deleted', { deleted: DeletedStatus.NOT_DELETED });
    return queryBuilder.getOne();
  }

  @Transactional()
  async remove(params: ParamsIntDto): Promise<void> {
    await this.tagRepository.delete({ id: params.id });
  }
}
