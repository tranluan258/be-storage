import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiPropertyOptional()
  parent_id?: number;

  @ApiPropertyOptional()
  metadata?: unknown;

  url?: string;

  @ApiProperty({
    name: 'file',
    format: 'binary',
  })
  file: Express.Multer.File;
}
