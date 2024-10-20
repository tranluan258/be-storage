import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { DrivesService } from './drives.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UserDecorator } from '@/shared/decorator';
import { JwtPayload } from '../auth/types';

@Controller('drives')
@ApiTags('Drives')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DrivesController {
  constructor(private readonly drivesService: DrivesService) {}

  @HttpCode(201)
  @Post()
  async create(
    @Body() createDriveDto: CreateDriveDto,
    @UserDecorator() user: JwtPayload,
  ): Promise<{ message: string }> {
    await this.drivesService.create(createDriveDto, user);

    return {
      message: 'Create drives successfully',
    };
  }
}
