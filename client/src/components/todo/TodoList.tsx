import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { todoType } from 'Hooks/useTodos';

interface TodoListProps {
  todoTab: string;
  currentDateTodos: todoType[];
  shiftTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoList: FC<TodoListProps> = ({
  todoTab,
  currentDateTodos,
  shiftTodo,
  deleteTodo,
}) => {

  if (!currentDateTodos) {
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
    <Block>
      {
        currentDateTodos.map((it: todoType, i: number) => {
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