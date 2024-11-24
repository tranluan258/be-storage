import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  BadRequestException,
} from '@nestjs/common';
import { DrivesService } from './drives.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UserDecorator } from '../../shared/decorator';
import { JwtPayload } from '../auth/types';
import { Drive } from '../database/schemas';
import { DriveDto, GetDrivesQueryString, UploadFileDto } from './dto';
import {
  ApiPaginateResponse,
  PaginationDto,
} from '../../shared/swager-response';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiPaginateResponse(DriveDto)
  async getDrives(
    @Query() query: GetDrivesQueryString,
    @UserDecorator() user: JwtPayload,
  ): Promise<PaginationDto<Drive>> {
    const drives = await this.drivesService.getDrives(query, user);
    return {
      data: drives,
      total: drives.length,
    };
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 5000,
          message: 'File size limit exceed',
        })
        .build({
          fileIsRequired: true,
          exceptionFactory: (error) => {
            throw new BadRequestException(error);
          },
        }),
    )
    file: Express.Multer.File,
    @UserDecorator() user: JwtPayload,
  ): Promise<{ message: string }> {
    if (!file) return { message: 'File is required' };

    await this.drivesService.upload(uploadFileDto, user, file);
    return {
      message: 'Create drives successfully',
    };
  }
}
