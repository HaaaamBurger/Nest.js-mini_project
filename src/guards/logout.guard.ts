import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokenPair } from '../common/interfaces/token.interface';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(@InjectRedisClient() private redisClient: RedisClient) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const [accessToken, refreshToken] =
        request.headers.authorization.split(',');

      if (accessToken[1] != '') {
        if (!(await this.redisClient.exists(accessToken[1]))) {
          return false;
        } else {
          await Promise.all([
            this.redisClient.del(accessToken[1]),
            this.redisClient.del(refreshToken[1]),
          ]);
          return true;
        }
      }
    }
    return false;
  }
}
