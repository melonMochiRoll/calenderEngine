import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoItem from 'Components/todo/TodoItem';
import TodoNull from 'Components/todo/TodoNull';
import { todoType } from 'Hooks/useTodos';

interface TodoListProps {
  todoTab: string;
  currentDateTodos: todoType[];
  updateTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
};

const TodoList: FC<TodoListProps> = ({
  todoTab,
  currentDateTodos,
  updateTodo,
  deleteTodo,
}) => {

  if (!currentDateTodos) {
    return (
      <Block>
        <TodoNull />
      </Block>
    );
  }

  const returnTodoItem = (it: todoType, index: number) => {
    return (
      <TodoItem
        key={index}
        index={index}
        item={it}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo} />
    );
  };

  return (
    <Block>
      {
        currentDateTodos.map((it: todoType, i: number) => {
          if (todoTab === 'all') {
            return returnTodoItem(it, i);
          }
          if (todoTab === 'completed' && it.isCompleted) {
            return returnTodoItem(it, i);
          }
          if (todoTab === 'pending' && !it.isCompleted) {
            return returnTodoItem(it, i);
          }
        })
      }
    </Block>
  );
};

export default TodoList;

const Block = styled.div`
  display: flex;
  height: 60%;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  overflow: auto;
  gap: 10px;
`;