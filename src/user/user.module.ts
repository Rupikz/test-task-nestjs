import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from 'src/libs/models/tag';
import { UserRepository } from 'src/libs/models/user';
import { UsersTagsRepository } from 'src/libs/models/users-tags';
import { TagService } from 'src/tag/tag.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([UserRepository, TagRepository, UsersTagsRepository])],
  controllers: [UserController],
  providers: [UserService, TagService],
  exports: [UserService, TagService],
})
export class UserModule {}
