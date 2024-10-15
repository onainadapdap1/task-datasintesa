import { Module } from '@nestjs/common';
import { RawDataService } from './raw-data.service';
import { RawDataController } from './raw-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from './schemas/rawData.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],
  providers: [RawDataService],
  controllers: [RawDataController],
})
export class RawDataModule {}
