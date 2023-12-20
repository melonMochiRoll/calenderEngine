import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Todos } from "src/entities/Todos";
import { TodosWithoutUserId } from "src/typings/types";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getCurrentMonthTodos(
    year: number,
    monthIndex: number,
    UserId: number,
  ) {
    try {
      const cached = await this.cacheManager.get(`${UserId}_${year}_${monthIndex}`);
      if (cached) {
        return cached;
      }
  
      const now = `${year}-${monthIndex + 1}`;
      const next = monthIndex === 11 ?
        `${year + 1}-${1}` :
        `${year}-${monthIndex + 2}`;
  
      const searchResult: TodosWithoutUserId[] = await this.todosRepository
        .find({
          select: {
            id: true,
            contents: true,
            date: true,
          },
          where: {
            UserId,
            date: Between(
              new Date(`${now}-1`),
              new Date(`${next}-1`)
            )
          },
          order: {
            date: 'ASC',
          }
        });
  
      const result = searchResult
        .reduce((acc: Object, item: TodosWithoutUserId) => {
          acc[`${item.date}`] = {
            id: item.id,
            contents: item.contents.split('&'),
          };
          return acc;
        }, {});
  
      await this.cacheManager.set(`${UserId}_${year}_${monthIndex}`, result);
  
      return result;
    } catch (err: any) {
      throw new InternalServerErrorException(err);;
    }
  };

  async createDateTodos(
    contents: string,
    date: string,
    year: number,
    monthIndex: number,
    UserId: number,
  ) {

    if (contents?.length > 660) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .save({ contents, date, UserId })
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${year}_${monthIndex}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async updateDateTodos(
    todosId: number,
    contents: string,
    year: number,
    monthIndex: number,
    UserId: number,
  ) {

    if (contents?.length > 660) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .update({ id: todosId }, { contents })
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${year}_${monthIndex}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async deleteDateTodos(
    todosId: number,
    year: number,
    monthIndex: number,
    UserId: number,
  ) {
    try {
      await this.todosRepository
        .delete(todosId)
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${year}_${monthIndex}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };
}