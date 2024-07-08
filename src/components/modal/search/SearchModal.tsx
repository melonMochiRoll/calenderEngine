import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import SearchResult from 'Components/modal/search/SearchResult';
import useSearch from 'Hooks/useSearch';

const SearchModal: FC = () => {
  const dispatch = useAppDispatch();
  const {
    query,
    onChangeQuery,
    status,
    todos,
    refetch,
    setOffset,
  } = useSearch();

  return (
    <Block
      onClick={e => e.stopPropagation()}>
      <Header>
        <SearchIcon
          fontSize='large'
          sx={{ color: '#66B3FF' }} />
        <Input
          type='text'
          value={query}
          onChange={onChangeQuery} />
        <CloseIcon
          onClick={() => dispatch(closeModal())}
          sx={{
            color: 'var(--white)',
            fontSize: '35px',
            cursor: 'pointer',
          }} />
      </Header>
      <SearchResult
        query={query}
        todos={todos}
        status={status} />
      <Footer />
    </Block>
  );
};

export default SearchModal;

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
  padding: 20px;
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

const Footer = styled.footer`
  width: 100%;
  height: 5%;
  background-color: var(--black);
  border-top: 1px solid var(--light-gray);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;