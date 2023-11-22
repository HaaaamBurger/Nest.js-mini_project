import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { UserEntity } from './databasa/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.host,
          port: customConfigService.port,
          username: customConfigService.username,
          password: customConfigService.password,
          entities: [UserEntity],
          database: customConfigService.database,
          synchronize: true,
        };
      },
      inject: [CustomConfigService],
    }),
    ConfigModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
