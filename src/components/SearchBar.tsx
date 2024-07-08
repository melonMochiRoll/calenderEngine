import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import { EModalName } from 'Components/common/RenderModal';
import useUser from 'Hooks/useUser';

interface SearchBarProps {};

const SearchBar: FC<SearchBarProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [ userData ] = useUser();
  const modalName = userData ? EModalName.Search : EModalName.LocalSearch;
  
  return (
    <Block
      onClick={() => dispatch(openModal(modalName))}>
      <SearchIcon
        sx={{ color: '#66B3FF' }}/>
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
    border-color: var(--pink)
  }

  span {
    color: var(--white);
  }

  svg {
    cursor: pointer;
  }
`;