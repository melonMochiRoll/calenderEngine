import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { TQueryStatus, TTodo } from 'Typings/types';

interface TodoListProps {
  todosStatus: TQueryStatus;
  todosData: TTodo[];
  updateTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoList: FC<TodoListProps> = ({
  todosStatus,
  todosData,
  updateTodo,
  deleteTodo,
}) => {

  if (!todosData || !todosData?.length || todosStatus === 'loading') {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  return (
    <>
      <Block>
        {
          todosData.map((todo: TTodo, i: number) => 
            <TodoItem
              key={todo.id}
              todos={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo} />
          )
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