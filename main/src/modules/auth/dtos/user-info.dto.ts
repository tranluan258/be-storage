import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiPropertyOptional()
  avatar?: string | null;
}
