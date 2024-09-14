import { ApiProperty } from '@nestjs/swagger';

class BadRequest {
  @ApiProperty()
  message: string | string[];
}

export const BadRequestResponse = {
  description: 'Bad Request',
  status: 400,
  type: BadRequest,
};
