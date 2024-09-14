import { ApiProperty } from '@nestjs/swagger';
class CreateSuccessFully {
  @ApiProperty()
  message: string;
}

export const CreatedResponse = {
  description: 'Create successfully',
  status: 201,
  type: CreateSuccessFully,
};
