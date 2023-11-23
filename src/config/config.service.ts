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

  get jwt_secret(): string {
    return this.configs.jwt_secret;
  }
  get jwt_expires_in(): string {
    return this.configs.jwt_expires_in;
  }
}
