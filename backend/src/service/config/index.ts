import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const config = () => ({
  port: parseInt(process.env.NEST_APP_PORT, 10) || 3001,
  mode: process.env.NODE_ENV ?? 'development',
  database: {
    mongo: {
      connectionString: `mongodb://mongodb:27017/${process.env.MONGO_DB_NAME}`,
      seeders: {
        enabled: process.env.SEEDERS_ENABLED,
      },
    },
  },
  simulator: {
    enabled: process.env.SIMULATOR_ENABLED,
    interval: {
      iotData: 2000,
      maintenance: 10000,
    },
  },
});

// the configuration module depends on the .env and the mode of operation of the application
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [config],
    }),
  ],
  exports: [ConfigModule],
})
export class ServiceConfigModule {}
