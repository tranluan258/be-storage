import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiPropertyOptional()
  parent_id?: number;

  @ApiPropertyOptional()
  metadata?: unknown;

  url?: string;

  @ApiPropertyOptional({
    type: 'file',
    name: 'file',
    format: 'binary',
  })
  file?: Express.Multer.File;
}
