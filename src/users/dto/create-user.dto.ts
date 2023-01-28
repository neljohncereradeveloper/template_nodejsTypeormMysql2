import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  // IsEnum,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /** firstName */
  @ApiProperty({
    type: String,
    maxLength: 20,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message:
      'FIRSTNAME is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message:
      'FIRSTNAME is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly firstName: string;

  /** middleName */
  @ApiProperty({
    type: String,
  })
  @IsString()
  readonly middleName: string;

  /** lastName */
  @ApiProperty({
    type: String,
    maxLength: 20,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message:
      'LASTNAME is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message:
      'LASTNAME is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly lastName: string;

  /** age */
  @ApiProperty({
    minimum: 18,
    maximum: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Max(100)
  readonly age: number;
}
