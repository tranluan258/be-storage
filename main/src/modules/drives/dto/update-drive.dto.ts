import { PartialType } from '@nestjs/swagger';
import { CreateDriveDto } from './create-drive.dto';

export class UpdateDriveDto extends PartialType(CreateDriveDto) {}
