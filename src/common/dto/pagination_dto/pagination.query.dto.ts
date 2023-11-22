import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit?: number;
}
