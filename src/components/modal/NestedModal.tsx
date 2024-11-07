import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { TNestedModals } from 'Typings/types';
import { closeNestedModal } from 'Features/modalSlice';
import TodoUpdate from './todo/TodoUpdate';

const NestedModals: TNestedModals = {
  TODO_UPDATE: <TodoUpdate />,
  CLOSE: null,
};

const NestedModal: FC = () => {
  const { nestedModalName } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  if (!nestedModalName || !NestedModals.hasOwnProperty(nestedModalName)) return;

  const renderModal = () => {
    return NestedModals[nestedModalName];
  };

  return (
    <>
      <Block
        onClick={() => dispatch(closeNestedModal())}>
        {renderModal()}
      </Block>
    </>
  );
};

export default NestedModal;

const Block = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
`;