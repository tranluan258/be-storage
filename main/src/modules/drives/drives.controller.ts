import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { DrivesService } from './drives.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UserDecorator } from '../../shared/decorator';
import { JwtPayload } from '../auth/types';
import { Drive } from '../database/schemas';
import { GetDrivesQueryString } from './dto';

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

  @Get()
  async getDrives(
    @Query() query: GetDrivesQueryString,
    @UserDecorator() user: JwtPayload,
  ): Promise<{ data: Drive[]; total: number }> {
    const drives = await this.drivesService.getDrives(query, user);
    return {
      data: drives,
      total: drives.length,
    };
  }
}
