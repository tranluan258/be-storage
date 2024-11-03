import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DriveDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  parent_id: number;

  @ApiPropertyOptional()
  url?: string;

  @ApiPropertyOptional()
  metadada?: unknown;
}
