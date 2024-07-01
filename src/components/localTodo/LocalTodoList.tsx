import React, { FC } from 'react';
import styled from '@emotion/styled';
import LocalTodoItem from './LocalTodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { TLocalTodo } from 'Typings/types';

interface LocalTodoListProps {
  todoTab: string;
  todosData: TLocalTodo[];
  shiftTodo: (todosId: string, isComplete: boolean) => void;
  deleteTodo: (todosId: string) => void;
};

const LocalTodoList: FC<LocalTodoListProps> = ({
  todoTab,
  todosData,
  shiftTodo,
  deleteTodo,
}) => {

  if (!todosData || !todosData?.length) {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  const returnLocalTodoItem = (
    i: number,
    todos: TLocalTodo,
  ) => {
    return <LocalTodoItem
      key={i}
      todos={todos}
      shiftTodo={shiftTodo}
      deleteTodo={deleteTodo} />;
  };
  
  return (
    <>
      <Block>
        {
          todosData.map((it: TLocalTodo, i: number) => {
            if (todoTab === 'all') {
              return returnLocalTodoItem(i, it);
            }
            if (todoTab === 'completed' && it.isComplete) {
              return returnLocalTodoItem(i, it);
            }
            if (todoTab === 'pending' && !it.isComplete) {
              return returnLocalTodoItem(i, it);
            }
          })
        }
      </Block>
      <TodosCount>
        <span>{`${todosData?.length || 0}/20`}</span>
      </TodosCount>
    </> 
  );
};

export default LocalTodoList;

const Block = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  overflow: auto;
  gap: 10px;
`;

const TodosCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;

  span {
    font-size: 20px;
    color: #fff;
  }
`;