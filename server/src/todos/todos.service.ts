import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Todos } from "src/entities/Todos";
import { ProcessedTodos, TodosWithoutUserId } from "src/typings/types";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import dayjs from "dayjs";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getTodos(
    date: string,
    UserId: number,
  ): Promise<any> {
    if (!new RegExp(/^\w{4}-\w{2}-\w{2}$/, 'g').test(date)) {
      throw new BadRequestException('날짜 형식을 확인해 주세요.');
    }

    try {
      const searchResult = await this.todosRepository.find({
        where: {
          UserId,
          date: dayjs(date).toDate(),
        },
      });

      return searchResult;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async getCurrentMonthTodosList(
    date: string,
    UserId: number,
  ): Promise<any> {
    try {
      const currentDate = dayjs(`${date}`);
      const currentYear = currentDate.year();
      const currentMonth = currentDate.month() + 1;

      const searchResult =
        await this.todosRepository
          .find({
            select: {
              contents: true,
              date: true,
            },
            where: {
              UserId,
              date: Between(
                dayjs(`${currentYear}-${currentMonth}-1`).toDate(),
                dayjs(`${currentYear}-${currentMonth}-31`).toDate()
              )
            },
            order: {
              id: 'ASC',
            }
          });

      const todosList =
        searchResult
          .reduce((acc: any, item: { contents: string, date: Date }) => {
            if (acc[`${item.date}`]) {
              if (acc[`${item.date}`].partialContents.length < 3) {
                acc[`${item.date}`].partialContents.push(item.contents);
                return acc;
              }

              return acc;
            }
  
            acc[`${item.date}`] = {
              partialContents: [ item.contents ],
            };
            return acc;
          }, {});
      
      return todosList;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };

  async getCurrentMonthTodos(
    date: string,
    UserId: number,
  ): Promise<ProcessedTodos> {
    try {
      const currentDate = dayjs(`${date}`);
      const currentYear = currentDate.year();
      const currentMonth = currentDate.month() + 1;

      const cached: ProcessedTodos = await this.cacheManager.get(`${UserId}_${currentYear}_${currentMonth}`);
      if (cached) {
        return cached;
      }
  
      const searchResult: TodosWithoutUserId[] =
        await this.todosRepository
        .find({
          select: {
            id: true,
            contents: true,
            date: true,
            isComplete: true,
            deadline: true,
          },
          where: {
            UserId,
            date: Between(
              dayjs(`${currentYear}-${currentMonth}-1`).toDate(),
              dayjs(`${currentYear}-${currentMonth}-31`).toDate()
            )
          },
          order: {
            date: 'ASC',
          }
        });
  
      const todosArray: ProcessedTodos = searchResult
        .reduce((acc: any, item: TodosWithoutUserId) => {
          const { date, ...rest } = item;

          acc.hasOwnProperty(`${date}`) ?
            acc[`${date}`].push(rest) :
            acc[`${date}`] = [{ ...rest }];

          return acc;
        }, {});
  
      if (todosArray.length) {
        // await this.cacheManager.set(`${UserId}_${currentYear}_${currentMonth}`, todosArray);
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
    const currentDate = dayjs(`${date}`);
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1;

    if (contents.length > 30) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .save({
          contents,
          date: currentDate.toDate(),
          UserId,
        })
        .then(
          async () => {
            // await this.cacheManager.del(`${UserId}_${currentYear}_${currentMonth}`);
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
    const currentDate = dayjs(`${date}`);
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1;

    if (contents.length > 30) {
      throw new BadRequestException('컨텐츠의 길이가 너무 깁니다!');
    }

    try {
      await this.todosRepository
        .update({ id: todosId }, { contents, isComplete })
        .then(
          async () => {
            // await this.cacheManager.del(`${UserId}_${currentYear}_${currentMonth}`);
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
      const currentDate = dayjs(`${date}`);
      const currentYear = currentDate.year();
      const currentMonth = currentDate.month() + 1;

      await this.todosRepository
        .delete(todosId)
        .then(
          async () => {
            // await this.cacheManager.del(`${UserId}_${currentYear}_${currentMonth}`);
          }
        );

      return true;
    } catch (err: any) {
      throw new InternalServerErrorException(err);
    }
  };
}