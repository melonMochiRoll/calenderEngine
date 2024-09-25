import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'Hooks/reduxHooks';
import SearchModal from 'Components/modal/search/SearchModal';

export const enum EModalName {
  Search = 'search',
  Close = '',
};

interface IModals {
  [EModalName.Search]: React.ReactElement,
  [EModalName.Close]: null,
};

const Modals: IModals = {
  [EModalName.Search]: <SearchModal />,
  [EModalName.Close]: null,
};

const RenderModal: FC = () => {
  const { modalName } = useAppSelector(state => state.modal);
  if (!modalName || !Modals.hasOwnProperty(modalName)) return;

  const renderModal = () => {
    return Modals[modalName];
  };

  return (
    <Block>
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