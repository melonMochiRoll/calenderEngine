import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import SearchResult from 'Components/modal/search/SearchResult';
import useSearchTodos from 'Hooks/useSearchTodos';
import useInput from 'Hooks/useInput';
import { clearQuery, setQuery } from 'Features/searchTodosSlice';

const SearchModal: FC = () => {
  const dispatch = useAppDispatch();
  const [ query, onChangeQuery ] = useInput('');

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        dispatch(setQuery({ query }));
      }, 500);

      return () => {
        dispatch(clearQuery());
        clearTimeout(delay);
      };
    }
  }, [query]);

  const {
    data: todosData,
    isLoading,
    canLoadMore,
    nextOffset,
  } = useSearchTodos();

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
          value={query}
          onChange={onChangeQuery}
          placeholder='검색'/>
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
        todosData={todosData}
        isLoading={isLoading}
        canLoadMore={canLoadMore}
        nextOffset={nextOffset} />
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