import React, { FC } from 'react';
import styled from '@emotion/styled';
import useInput from 'Hooks/useInput';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {

};

const SearchBar: FC<SearchBarProps> = ({

}) => {
  const [ value, onChangeValue ] = useInput('');

  const onSubmit = (value: string) => {
    value = value.trim();
    if (!value) return; 

    
  };

  return (
    <Block>
      <InputBox>
        <SearchIcon
          onClick={() => onSubmit(value)}
          sx={{
            color: 'var(--white)',
          }}/>
        <Input
          value={value}
          onChange={onChangeValue}
          type='text'
          placeholder='Search...'/>
      </InputBox>
    </Block>
  );
};

export default SearchBar;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: 15px;
  padding: 10px;

  svg {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 200px;
  border: none;
  color: var(--white);
  padding: 0 10px;
  font-size: 17px;
  font-weight: 500;
  background-color: var(--light-gray);

  &::placeholder {
    font-weight: 500;
    color: #868e96;
  }

  &:focus {
    outline: none;
  }
`;