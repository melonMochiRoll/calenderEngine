import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import SearchModal from 'Components/modal/search/SearchModal';
import SharedspaceManagerModal from 'Components/modal/SharedspaceManagerModal';
import { closeModal } from 'Features/modalSlice';

export const ModalName = {
  SEARCH: 'SEARCH',
  SHAREDSPACEMANAGER: 'SHAREDSPACEMANAGER',
  CLOSE: '',
} as const;

export type TModalName = typeof ModalName[keyof typeof ModalName];

type TModals = Record<keyof typeof ModalName, React.ReactNode | null>;

const Modals: TModals = {
  SEARCH: <SearchModal />,
  SHAREDSPACEMANAGER: <SharedspaceManagerModal />,
  CLOSE: null,
};

const RenderModal: FC = () => {
  const { modalName } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  if (!modalName || !Modals.hasOwnProperty(modalName)) return;

  const renderModal = () => {
    return Modals[modalName];
  };

  return (
    <Block
      onClick={() => dispatch(closeModal())}>
      {renderModal()}
    </Block>
  );
};

export default RenderModal;

const Block = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;