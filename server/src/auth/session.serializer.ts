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

  serializeUser(user: Users, done: (err: Error, user: Users) => void) {
    done(null, user);
  };

  async deserializeUser(user: Users, done: (err: Error, user: UserWithoutPassword) => void) {
    const result = await this.usersService.getOneById(user.id);
    const { password, ...rest } = result;

    return result ? done(null, rest) : done(null, null);
  };
}