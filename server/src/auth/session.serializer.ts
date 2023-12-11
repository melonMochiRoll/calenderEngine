import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Users } from "src/entities/Users";
import { UserWithoutPassword } from "src/typings/types";
import { UsersService } from "src/users/users.service";
import { Cache } from 'cache-manager';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {
    super();
  }

  serializeUser(user: Users, done: (err: Error, userId: number) => void) {
    done(null, user?.id);
  };

  async deserializeUser(userId: number, done: (err: Error, user: UserWithoutPassword) => void) {
    const cached = await this.cacheManager.get(`${userId}`);
    if (cached) {
      return done(null, cached as UserWithoutPassword);
    }

    const result = await this.usersService.getOneById(userId);
    const { password, ...rest } = result;

    await this.cacheManager.set(`${userId}`, rest);

    return result ? done(null, rest) : done(null, null);
  };
}