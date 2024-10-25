import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import SharedspaceManagerMain from './SharedspaceManagerMain';
import useInput from 'Hooks/useInput';
import { clearQuery, setQuery } from 'Features/searchUsersSlice';

const SharedspaceManagerModal: FC = () => {
  const dispatch = useAppDispatch();
  const [ value, onChangeValue ] = useInput('');

  useEffect(() => {
    if (value) {
      const delay = setTimeout(() => {
        dispatch(setQuery({ query: value }));
      }, 500);

      return () => {
        dispatch(clearQuery());
        clearTimeout(delay);
      };
    }
  }, [value]);
  
  return (
    <Block
      onClick={e => e.stopPropagation()}>
      <Header>
        <SearchIcon
          fontSize='large'
          sx={{ color: '#66B3FF' }} />
        <Input
          autoFocus
          type='text'
          value={value}
          onChange={onChangeValue}
          placeholder='초대 할 유저 검색' />
        <CloseIcon
          onClick={() => dispatch(closeModal())}
          sx={{
            color: 'var(--white)',
            fontSize: '35px',
            cursor: 'pointer',
          }} />
      </Header>
      <SharedspaceManagerMain />
    </Block>
  );
};

export default SharedspaceManagerModal;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 500px;
  border: 1px solid #1d2126;
  border-radius: 15px;
  background-color: var(--black);
  box-shadow: 1px 1px 10px 2px #000;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  padding: 20px 25px;
  border-bottom: 1px solid var(--light-gray);
`;

const Input = styled.input`
  width: 100%;
  padding: 0 20px;
  color: var(--white);
  font-size: 24px;
  background-color: var(--black);
  border: none;
  outline: none;
`;