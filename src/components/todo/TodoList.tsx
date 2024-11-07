import React, { FC, Fragment } from 'react';
import styled from '@emotion/styled';
import TodoNull from 'Components/todo/TodoNull';
import { TTodo } from 'Typings/types';
import useTodosList from 'Hooks/useTodosList';
import { useAppSelector } from 'Hooks/reduxHooks';
import TodoItem from './TodoItem';
import { TODO_PALETTE } from 'Lib/calendarConstants';
import { getTodoHeight, renderTime } from 'Lib/utilFunction';
import TodoBlank from './TodoBlank';

interface TodoListProps {};

const TodoList: FC<TodoListProps> = ({}) => {
  const { data: todosData } = useTodosList();
  const { todoTime } = useAppSelector(state => state.todoTime);

  if (!todosData[todoTime] || !todosData[todoTime]?.length) {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  return (
    <Block>
      <ListHeader>
        <TimeDiv>
          <TimeSpan>{renderTime(todosData[todoTime][0]?.startTime)}</TimeSpan>
        </TimeDiv>
      </ListHeader>
      <ListBody>
        {
          todosData[todoTime].map((todo: TTodo, idx: number) => {
            const { endTime } = todo;
            const isNotLastTodo = idx !== todosData[todoTime].length - 1;

            if (isNotLastTodo) {
              const { startTime: nextTodoStartTime } = todosData[todoTime][idx + 1];
              const hasTimeGap = endTime !== nextTodoStartTime;

              if (hasTimeGap) {
                return (
                  <Fragment key={todo.id}>
                    <TodoItem
                      todo={todo}
                      bgColor={TODO_PALETTE[idx % 7]} />
                    <TodoBlank
                      blankHeight={getTodoHeight(endTime, nextTodoStartTime)}
                      nextTodoStartTime={nextTodoStartTime}
                      borderBottomColor={TODO_PALETTE[(idx + 1) % 7]} />
                  </Fragment>
                );
              }
            }

            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                bgColor={TODO_PALETTE[idx % 7]} />
            );
          })
        }
      </ListBody>
    </Block>
  );
};

export default TodoList;

const Block = styled.div`
  display: flex;
  width: 100%;
  height: 75%;
  padding: 10px;
  margin-bottom: 30px;
  flex-direction: column;
  overflow: auto;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--white);
  font-size: 22px;
  font-weigth: 600;
  margin: 0;
  border-bottom: 1px solid var(--white);
`;

const TimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 15%;
  height: 30px;
`;

const TimeSpan = styled.span`
  color: var(--white);
  font-size: 22px;
  font-weight: 500;
`;

const ListBody = styled.div`
  display: flex;
  flex-direction: column;
`;