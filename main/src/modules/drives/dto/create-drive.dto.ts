import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDriveDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  parent_id?: number;

  @ApiPropertyOptional()
  metadata?: unknown;

  url?: string;
}
