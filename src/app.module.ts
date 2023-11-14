import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: () => {
        return {
          type: 'postgres',
          host: '',
          port: 5432,
          username: 'user',
          password: 'pass',
          entities: [],
          database: 'march-2023',
          synchronize: true,
        };
      },
      inject: [],
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
