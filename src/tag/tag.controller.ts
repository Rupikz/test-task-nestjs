import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthUserGuard } from 'src/auth/guards/jwt-user.guard';
import { DeletedStatus } from 'src/libs/common/constants';
import { ApiOk } from 'src/libs/common/decorators';
import { ParamsIntDto } from 'src/libs/common/dtos';
import { TagNameExistException, TagNotFoundException } from 'src/libs/common/exceptions';
import { TagDto } from 'src/libs/models/tag';
import { CreateTagDto } from './dtos/create-tag.dto';
import { EditTagDto } from './dtos/edit-tag.dto';
import { TagPageOptionsDto } from './dtos/tag-page-options.dto';
import { TagPageDto } from './dtos/tag-page.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tags')
@ApiBearerAuth('USER')
@UseGuards(JwtAuthUserGuard)
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  @ApiOk({ summary: 'Создать тег' }, { type: TagDto })
  async create(@Body() data: CreateTagDto): Promise<TagDto> {
    const isExist = await this.tagService.getMin({ ...data, deleted: DeletedStatus.NOT_DELETED });
    if (isExist) {
      throw new TagNameExistException();
    }
    return await this.tagService.create(data);
  }

  @Get(':id')
  @ApiOk({ summary: 'Получить тег по id' }, { type: TagDto })
  async fineOne(@Param() params: ParamsIntDto): Promise<TagDto> {
    const tag = await this.tagService.getMin({ id: params.id, deleted: DeletedStatus.NOT_DELETED });
    if (!tag) {
      throw new TagNotFoundException();
    }
    return new TagDto(tag);
  }

  @Put(':id')
  @ApiOk({ summary: 'Редактировать тег по id' }, { type: TagDto })
  async edit(@Param() params: ParamsIntDto, @Body() data: EditTagDto): Promise<TagDto> {
    const tag = await this.tagService.getMin({ id: params.id, deleted: DeletedStatus.NOT_DELETED });
    if (!tag) {
      throw new TagNotFoundException();
    }
    await this.tagService.edit(params, data);
    return new TagDto(await this.tagService.getMin({ id: params.id }));
  }

  @ApiOk({ summary: 'Список тегов' }, { type: TagPageDto })
  @Get()
  async privateList(@Query() pageOptionsDto: TagPageOptionsDto): Promise<TagPageDto> {
    const [list, itemCount] = await this.tagService.findAll(pageOptionsDto);
    return new TagPageDto(list, { itemCount, pageOptionsDto });
  }

  @ApiOk({ summary: 'Удалить тег по id' }, { type: Boolean })
  @Delete(':id')
  async remove(@Param() params: ParamsIntDto): Promise<boolean> {
    const tag = await this.tagService.getMin({ id: params.id, deleted: DeletedStatus.NOT_DELETED });
    if (!tag) {
      throw new TagNotFoundException();
    }
    await this.tagService.remove(params);
    return true;
  }
}
