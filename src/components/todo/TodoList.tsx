import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { statusType } from 'Hooks/useTodos';
import { TTodo } from 'Typings/types';

interface TodoListProps {
  todoTab: string;
  todosStatus: statusType;
  todosData: TTodo[];
  shiftTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoList: FC<TodoListProps> = ({
  todoTab,
  todosStatus,
  todosData,
  shiftTodo,
  deleteTodo,
}) => {

  if (!todosData || !todosData?.length || todosStatus === 'loading') {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  const returnTodoItem = (
    i: number,
    todos: TTodo,
  ) => {
    return <TodoItem
      key={i}
      todos={todos}
      shiftTodo={shiftTodo}
      deleteTodo={deleteTodo} />;
  };

  return (
    <>
      <Block>
        {
          todosData.map((it: TTodo, i: number) => {
            if (todoTab === 'all') {
              return returnTodoItem(i, it);
            }
            if (todoTab === 'completed' && it.isComplete) {
              return returnTodoItem(i, it);
            }
            if (todoTab === 'pending' && !it.isComplete) {
              return returnTodoItem(i, it);
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

export default memo(TodoList);

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