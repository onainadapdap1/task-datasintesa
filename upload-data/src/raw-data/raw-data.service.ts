import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { RawData, RawDataDocument } from './schemas/rawData.schema';

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name) private rawDataModel: Model<RawDataDocument>,
  ) {}
  async uploadCsv(file: Express.Multer.File): Promise<any> {
    const stream = Readable.from(file.buffer.toString());
    stream.pipe(csv()).on('data', async (row) => {
      const {
        'Result Time': resultTime,
        'Object Name': objectName,
        'L.Cell.Avail.Dur': availDur,
      } = row;

      const enodebId = objectName.match(/eNodeB ID=(\d+)/)?.[1];
      const cellId = objectName.match(/Local Cell ID=(\d+)/)?.[1];

      if (enodebId && cellId && resultTime) {
        const rawData = new this.rawDataModel({
          resultTime: new Date(resultTime),
          enodebId,
          cellId,
          availDur: Number(availDur),
        });

        try {
          await rawData.save();
        } catch (error) {
          if (error.code !== 11000) {
            throw error;
          }
        }
      }
    });

    return { status: 'success', message: 'Data uploaded successfully' };
  }

  async getFilteredData(
    enodebId: string,
    cellId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any[]> {
    // Query untuk mengambil data dari MongoDB
    const rawData = await this.rawDataModel
      .find({
        enodebId,
        cellId,
        resultTime: { $gte: startDate, $lte: endDate },
      })
      .exec();

    // Mengubah format output
    return rawData.map((data) => ({
      resultTime: data.resultTime,
      availability: (data.availDur / 900) * 100,
    }));
  }
}
