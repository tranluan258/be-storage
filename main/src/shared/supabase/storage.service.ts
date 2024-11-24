import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseStorageConfig } from '../../modules/app-config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class StorageSerice implements OnModuleInit {
  private suppabaseClient: S3Client;
  private readonly logger: Logger = new Logger(StorageSerice.name);
  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const supabaseStorageConfig =
      this.configService.get<SupabaseStorageConfig>('supabase')!;
    console.log(supabaseStorageConfig);
    this.suppabaseClient = new S3Client({
      forcePathStyle: true,
      ...supabaseStorageConfig,
    });
  }

  async upload(file: Express.Multer.File): Promise<string | undefined> {
    try {
      const path = `upload/${file.originalname}`;

      const upload = new Upload({
        client: this.suppabaseClient,
        queueSize: 10,
        params: {
          Bucket: 'file-storage',
          Key: path,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });

      await upload.done();

      return path;
    } catch (err) {
      this.logger.error('Upload error' + err);
      return '';
    }
  }
}
