import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetDrivesQueryString {
  @ApiPropertyOptional()
  parent_id?: number;
}
