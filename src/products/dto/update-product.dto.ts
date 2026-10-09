// TODO 2: Add validators for a partial update.

import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

// Only name and stock may be received by this operation.
export class UpdateProductDto {
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  stock?: number;
}
