import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidationOptions } from 'class-validator';

export function ApiPropertyNickname(min: number, max: number, options: ApiPropertyOptions = {}) {
  return applyDecorators(
    MinLength(min),
    MaxLength(max),
    IsString(),
    IsNotEmpty(),
    ApiProperty({ example: 'Nickname', minLength: min, maxLength: max, ...options })
  );
}
export function ApiPropertyOptionalNickname(min: number, max: number, options: ApiPropertyOptions = {}) {
  return applyDecorators(
    MinLength(min),
    MaxLength(max),
    IsString(),
    IsOptional(),
    ApiPropertyOptional({ example: 'Nickname', minLength: min, maxLength: max, ...options })
  );
}
export function ApiPropertyPassword(min: number, max = 50, options: ApiPropertyOptions = {}) {
  return applyDecorators(
    MinLength(min),
    MaxLength(max),
    IsString(),
    IsNotEmpty(),
    Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' }),
    ApiProperty({ example: 'Password1!', minLength: min, maxLength: max, ...options })
  );
}

export function ApiPropertyOptionalPassword(min: number, max = 50, options: ApiPropertyOptions = {}) {
  return applyDecorators(
    MinLength(min),
    MaxLength(max),
    IsString(),
    IsOptional(),
    Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' }),
    ApiPropertyOptional({ example: 'Password1!', minLength: min, maxLength: max, ...options })
  );
}
export function ApiPropertyEmail(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsEmail(), IsNotEmpty(), ApiProperty({ example: 'mail@mail.ru', ...options }));
}
export function ApiPropertyOptionalEmail(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsEmail(), IsOptional(), ApiPropertyOptional({ example: 'mail@mail.ru', ...options }));
}
export function ApiPropertyName(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsString(), MinLength(2), IsNotEmpty(), ApiProperty({ ...options, minLength: 2 }));
}
export function ApiPropertyOptionalName(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsString(), MinLength(2), IsOptional(), ApiPropertyOptional({ minLength: 1, ...options }));
}
export function ApiPropertyUuid(options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(
    IsInt(validationOptions),
    Min(36, validationOptions),
    Max(36, validationOptions),
    ApiProperty({ example: '7e984a6c-3a01-4a5a-ae28-01751917b2a6', type: 'string', minLength: 36, maxLength: 36, ...options })
  );
}
export function ApiPropertyOptionalUuid(options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(
    IsInt(validationOptions),
    Min(36, validationOptions),
    Max(36, validationOptions),
    IsOptional(),
    ApiPropertyOptional({ type: 'uuid', minLength: 36, maxLength: 36, ...options })
  );
}
export function ApiPropertyId(options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(IsInt(validationOptions), Min(1, validationOptions), ApiProperty({ type: 'integer', minimum: 1, ...options }));
}
export function ApiPropertyOptionalId(options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(IsInt(validationOptions), Min(1, validationOptions), IsOptional(), ApiPropertyOptional({ type: 'integer', minimum: 1, ...options }));
}
export function ApiPropertyString(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsString(), IsNotEmpty(), ApiProperty({ type: 'string', ...options }));
}
export function ApiPropertyOptionalString(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsString(), IsOptional(), ApiPropertyOptional({ type: 'string', ...options }));
}
export function ApiPropertyInt(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsInt(), ApiProperty({ type: 'integer', ...options }));
}
export function ApiPropertyOptionalInt(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsInt(), IsOptional(), ApiPropertyOptional({ type: 'integer', ...options }));
}
export function ApiOptionPage() {
  return applyDecorators(
    Min(1),
    IsInt(),
    IsOptional(),
    Type(() => Number),
    ApiPropertyOptional({ type: 'integer', minimum: 1, default: 1 })
  );
}
export function ApiOptionTake() {
  return applyDecorators(
    IsInt(),
    Min(1),
    Max(100000),
    IsOptional(),
    Type(() => Number),
    ApiPropertyOptional({ type: 'integer', minimum: 1, maximum: 100000, default: 10 })
  );
}
export function ApiPropertyDate(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsDate(), ApiProperty({ type: 'string', format: 'date-time', ...options }));
}
export function ApiPropertyOptionalDate(options: ApiPropertyOptions = {}) {
  return applyDecorators(IsDate(), IsOptional(), ApiPropertyOptional({ type: 'string', format: 'date-time', ...options }));
}
export function ApiPropertyEnum(enumValues: any[] | Record<string, any>, options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(IsEnum(enumValues, validationOptions), IsNotEmpty(), ApiPropertyOptional({ enum: enumValues, ...options }));
}
export function ApiPropertyOptionalEnum(enumValues: any[] | Record<string, any>, options: ApiPropertyOptions = {}, validationOptions: ValidationOptions = {}) {
  return applyDecorators(IsOptional(), IsEnum(enumValues, validationOptions), ApiPropertyOptional({ enum: enumValues, ...options }));
}
