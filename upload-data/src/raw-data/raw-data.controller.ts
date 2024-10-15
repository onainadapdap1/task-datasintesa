import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RawDataService } from './raw-data.service';

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.rawDataService.uploadCsv(file);
  }

  @Get('graph')
  async getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.rawDataService.getFilteredData(
      enodebId,
      cellId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
