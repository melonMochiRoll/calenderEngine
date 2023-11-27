import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Users } from "src/entities/Users";
import { UserWithoutPassword } from "src/typings/types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: Users, done: (err: Error, userId: number) => void) {
    done(null, user?.id);
  };

  async deserializeUser(userId: number, done: (err: Error, user: UserWithoutPassword) => void) {
    const result = await this.usersService.getOneById(userId);
    const { password, ...rest } = result;

    return result ? done(null, rest) : done(null, null);
  };
}