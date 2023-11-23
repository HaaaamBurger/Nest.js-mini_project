import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'allConfigs';

export default registerAs(token, () => ({
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USERNAME'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  jwt_secret: configService.get<string>('JWT_SECRET'),
  jwt_expires_in: configService.get<string>('JWT_EXPIRES_IN'),
}));
