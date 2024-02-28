import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// mongodb connection module
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('database.mongo.connectionString'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class MongoDbModule {}
