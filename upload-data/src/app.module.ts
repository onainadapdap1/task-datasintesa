import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawDataModule } from './raw-data/raw-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Memastikan config bisa diakses di seluruh modul
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // Mengambil URI dari file .env
    RawDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
