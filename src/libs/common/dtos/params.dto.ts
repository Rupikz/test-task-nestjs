import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class ParamsUuidDto {
  @IsUUID()
  @Type(() => String)
  @IsNotEmpty()
  @ApiPropertyOptional({
    type: 'uuid',
    minLength: 36,
    maxLength: 36,
  })
  readonly id: string;
}

export class ParamsIntDto {
  @Type(() => Number)
  @IsInt()
  @Min(1, {})
  @IsNotEmpty()
  @ApiPropertyOptional({
    minimum: 1,
  })
  readonly id: number;
}
