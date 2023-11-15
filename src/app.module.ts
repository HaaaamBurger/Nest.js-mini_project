import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { UserEntity } from './databasa/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.host,
          port: customConfigService.port,
          username: customConfigService.username,
          password: customConfigService.password,
          entities: [
            path.join(__dirname, '..', 'database', '**', '*.entity{.ts,.js}'),
          ],
          database: customConfigService.database,
          synchronize: true,
        };
      },
      inject: [CustomConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
