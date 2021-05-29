import { Body, CacheInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthUserGuard } from 'src/auth/guards/jwt-user.guard';
import { DeletedStatus } from 'src/libs/common/constants';
import { ApiOk } from 'src/libs/common/decorators';
import { ParamsIntDto } from 'src/libs/common/dtos';
import { TagNameExistException, TagNotFoundException } from 'src/libs/common/exceptions';
import { CreateTagDto } from './dtos/request/create-tag.dto';
import { EditTagDto } from './dtos/request/edit-tag.dto';
import { TagPageOptionsDto } from './dtos/request/tag-page-options.dto';
import { TagPageDto } from './dtos/response/tag-page.dto';
import { TagWithCreatorDto } from './dtos/response/tag-with-creator.dto';
import { TagDto } from './dtos/response/tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tags')
@ApiBearerAuth('USER')
@UseGuards(JwtAuthUserGuard)
@UseInterceptors(CacheInterceptor)
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
  @ApiOk({ summary: 'Получить тег по id' }, { type: TagWithCreatorDto })
  async fineOne(@Param() params: ParamsIntDto): Promise<TagWithCreatorDto> {
    const tag = await this.tagService.findOneWithCreator({ id: params.id, deleted: DeletedStatus.NOT_DELETED });
    if (!tag) {
      throw new TagNotFoundException();
    }
    return new TagWithCreatorDto(tag);
  }

  @Put(':id')
  @ApiOk({ summary: 'Редактировать тег по id' }, { type: TagWithCreatorDto })
  async edit(@Param() params: ParamsIntDto, @Body() data: EditTagDto): Promise<TagWithCreatorDto> {
    const tag = await this.tagService.getMin({ id: params.id, deleted: DeletedStatus.NOT_DELETED });
    if (!tag) {
      throw new TagNotFoundException();
    }
    await this.tagService.edit(params, data);
    return new TagWithCreatorDto(await this.tagService.findOneWithCreator({ id: params.id }));
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
