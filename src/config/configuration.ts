import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'allConfigs';

export default registerAs(token, () => ({
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USERNAME'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  bcrypt_salt: configService.get<string>('BCRYPT_SALT'),
  jwt_access_secret: configService.get<string>('JWT_ACCESS_SECRET'),
  jwt_refresh_secret: configService.get<string>('JWT_REFRESH_SECRET'),
}));
