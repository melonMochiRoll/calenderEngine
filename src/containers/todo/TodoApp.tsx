import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoList from 'Components/todo/TodoList';
import TodoTitle from 'Components/todo/TodoTitle';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import TodoInit from 'Components/todo/TodoInit';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { openModal } from 'Features/modalSlice';
import { ModalName } from 'Typings/types';

interface TodoAppProps {};

const TodoApp: FC<TodoAppProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { todoTime } = useAppSelector(state => state.todoTime);
  
  if (!todoTime) {
    return <TodoInit />;
  }
  
  return (
    <Container>
      <TodoTitle />
      <FlexBox
        onClick={() => dispatch(openModal(ModalName.TODO_INPUT))}>
        <AddIcon fontSize='large' sx={{ color: 'var(--blue)' }}/>
        <Span>새 Todo 작성</Span>
      </FlexBox>
      <TodoList />
    </Container>
  );
};

export default TodoApp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  padding: 10px 20px;
  color: var(--white);
  border: 1px solid var(--gray-7);
  cursor: pointer;
  gap: 6px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Span = styled.span`
  font-size: 22px;
  font-weight: 700;
`;