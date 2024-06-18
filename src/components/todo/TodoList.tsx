import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { statusType, todosType } from 'Hooks/useTodos';

interface TodoListProps {
  todoTab: string;
  todosStatus: statusType;
  todosData: todosType[];
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

  if (!todosData || todosStatus === 'loading') {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  const returnTodoItem = (
    i: number,
    todos: todosType,
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
          todosData.map((it: todosType, i: number) => {
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
  height: 60%;
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
    color: #fff;
  }
`;