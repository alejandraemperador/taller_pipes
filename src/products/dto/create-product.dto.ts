// TODO 1: Add the input validators described in the exercise.
// Keep this DTO as a class and import it normally in the controller.
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsIn,
  IsInt,
  Min,
  Max
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['office', 'electronics'])
  category!: 'office' | 'electronics';

  @IsInt()
  @Min(0)
  @Max(1000)
  stock!: number;
}
