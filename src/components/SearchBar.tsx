import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import { EModalName } from 'Components/common/RenderModal';

interface SearchBarProps {};

const SearchBar: FC<SearchBarProps> = ({}) => {
  const dispatch = useAppDispatch();
  
  return (
    <Block
      onClick={() => dispatch(openModal(EModalName.Search))}>
      <SearchIcon
        sx={{ color: 'var(--blue)' }}/>
      <span>Search...</span>
    </Block>
  );
};

export default SearchBar;

const Block = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  width: 185px;
  border: 1px solid var(--light-gray);
  border-radius: 15px;
  padding: 8px 10px;
  gap: 10px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    border-color: var(--blue);
  }

  span {
    color: var(--white);
  }

  svg {
    cursor: pointer;
  }
`;