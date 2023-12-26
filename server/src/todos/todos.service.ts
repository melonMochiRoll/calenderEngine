import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Todos } from "src/entities/Todos";
import { ProcessedTodos, TodosWithoutUserId } from "src/typings/types";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getCurrentMonthTodos(
    date: string,
    UserId: number,
  ): Promise<ProcessedTodos> {
    try {
      const currentDate = dayjs.tz(`${date}`);
      const currentYear = currentDate.year();
      const currenyMonth = currentDate.month() + 1;

      const cached: ProcessedTodos = await this.cacheManager.get(`${UserId}_${currentYear}_${currenyMonth}`);
      if (cached) {
        return cached;
      }
  
      const searchResult: TodosWithoutUserId[] = await this.todosRepository
        .find({
          select: {
            id: true,
            contents: true,
            createdAt: true,
            isComplete: true,
            deadline: true,
          },
          where: {
            UserId,
            createdAt: Between(
              dayjs.tz(`${currentYear}-${currenyMonth}-1`).toDate(),
              dayjs.tz(`${currentYear}-${currenyMonth}-31`).toDate()
            )
          },
          order: {
            createdAt: 'ASC',
          }
        });
  
      const todosArray: ProcessedTodos = searchResult
        .reduce((acc: any, item: TodosWithoutUserId) => {
          const { createdAt, ...rest } = item;

          acc.hasOwnProperty(`${createdAt}`) ?
            acc[`${createdAt}`].push(rest) :
            acc[`${createdAt}`] = [{ ...rest }];

          return acc;
        }, {});
  
      if (todosArray.length) {
        await this.cacheManager.set(`${UserId}_${currentYear}_${currenyMonth}`, todosArray);
      }
  
      return todosArray;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async createDateTodos(
    contents: string,
    date: string,
    UserId: number,
  ) {
    const currentDate = dayjs.tz(`${date}`);
    const currentYear = currentDate.year();
    const currenyMonth = currentDate.month() + 1;

    if (contents.length > 30) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .save({
          contents,
          createdAt: currentDate.toDate(),
          UserId,
        })
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${currentYear}_${currenyMonth}`);
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
    isComplete: boolean,
    date: string,
    UserId: number,
  ) {
    const currentDate = dayjs.tz(`${date}`);
    const currentYear = currentDate.year();
    const currenyMonth = currentDate.month() + 1;

    if (contents.length > 30) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .update({ id: todosId }, { contents, isComplete })
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${currentYear}_${currenyMonth}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async deleteDateTodos(
    todosId: number,
    date: string,
    UserId: number,
  ) {
    try {
      const currentDate = dayjs.tz(`${date}`);
      const currentYear = currentDate.year();
      const currenyMonth = currentDate.month() + 1;

      await this.todosRepository
        .delete(todosId)
        .then(
          async () => {
            await this.cacheManager.del(`${UserId}_${currentYear}_${currenyMonth}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };
}