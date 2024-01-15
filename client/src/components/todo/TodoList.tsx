import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { todoType } from 'Hooks/useTodos';

interface TodoListProps {
  todoTab: string;
  todosData: todoType[];
  shiftTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoList: FC<TodoListProps> = ({
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

  const returnTodoItem = (i: number, it: todoType) => {
    return <TodoItem
      key={i}
      todos={it}
      shiftTodo={shiftTodo}
      deleteTodo={deleteTodo} />;
  };

  return (
    <>
      <Block>
        {
          todosData.map((it: todoType, i: number) => {
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
        <span>{`${todosData?.length}/20`}</span>
      </TodosCount>
    </> 
  );
};

export default memo(TodoList);

const Block = styled.div`
  display: flex;
  height: 60%;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #2f323b;
  overflow: auto;
  gap: 10px;
`;

const TodosCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;

  span {
    color: #fff;
  }
`;