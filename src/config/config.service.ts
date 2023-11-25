import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.configs.host;
  }

  get port(): number {
    return this.configs.port;
  }

  get username(): string {
    return this.configs.username;
  }

  get password(): string {
    return this.configs.password;
  }

  get database(): string {
    return this.configs.database;
  }

  get bcrypt_salt(): string {
    return this.configs.bcrypt_salt;
  }
}
