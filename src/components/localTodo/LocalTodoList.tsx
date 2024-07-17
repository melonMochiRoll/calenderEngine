import React, { FC } from 'react';
import styled from '@emotion/styled';
import LocalTodoItem from './LocalTodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { TLocalTodo } from 'Typings/types';

interface LocalTodoListProps {
  todoTab: string;
  todosData: TLocalTodo[];
  editTodo: (todosId: string, contents: string) => void;
  shiftTodo: (todosId: string, isComplete: boolean) => void;
  deleteTodo: (todosId: string) => void;
};

const LocalTodoList: FC<LocalTodoListProps> = ({
  todoTab,
  todosData,
  editTodo,
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
    todos: TLocalTodo,
  ) => {
    return <LocalTodoItem
      key={todos.id}
      todos={todos}
      editTodo={editTodo}
      shiftTodo={shiftTodo}
      deleteTodo={deleteTodo} />;
  };
  
  return (
    <>
      <Block>
        {
          todosData.map((it: TLocalTodo, i: number) => {
            if (todoTab === 'all') {
              return returnLocalTodoItem(it);
            }
            if (todoTab === 'completed' && it.isComplete) {
              return returnLocalTodoItem(it);
            }
            if (todoTab === 'pending' && !it.isComplete) {
              return returnLocalTodoItem(it);
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