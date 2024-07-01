import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_KEY } from 'Lib/queryKeys';
import TodoApp from 'Containers/todo/TodoApp';
import LocalTodoApp from 'Containers/todo/LocalTodoApp';

interface RenderTodoAppProps {};

const RenderTodoApp: FC<RenderTodoAppProps> = ({}) => {
  const qc = useQueryClient();
  const userData = qc.getQueryData([GET_USER_KEY]);
  
  return (
    <>
      {userData ?
        <TodoApp /> :
        <LocalTodoApp />}
    </>
  );
};

export default RenderTodoApp;