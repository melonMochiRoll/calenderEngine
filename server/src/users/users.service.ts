import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import 'dotenv/config';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async getOneById(
    id: number,
    ): Promise<Users> {
    return await this.usersRepository.findOneBy({ id });
  };

  async getOneByEmail(
    email: string,
    ): Promise<Users> {
    return await this.usersRepository.findOneBy({ email });
  };

  async createUser(
    email: string,
    password: string,
  ) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (emailPattern.test(email)) {
      throw new ConflictException('이메일 형식을 확인해주세요');
    }

    if (await this.getOneByEmail(email)) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    try {
      const hash = await bcrypt.hash(password, 11);
      await this.usersRepository.save({
        email,
        password: hash,
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }

    return true;
  };
}