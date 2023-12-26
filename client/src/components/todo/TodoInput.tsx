import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import useInput from 'Hooks/useInput';

interface TodoInputProps {
  addTodo: (value: string) => void;
};

const TodoInput: FC<TodoInputProps> = ({
  addTodo,
}) => {
  const [ value, _, setValue ] = useInput('');

  const onChangeValueWithMaxLength = useCallback((e: any) => {
    if (e.target.value.length > 30) {
      return;
    }

    setValue(e.target.value);
  }, [value]);

  const onSubmit = (value: string) => {
    addTodo(value);
    setValue('');
  };

  return (
    <Block>
      <Top>
        <Input
          value={value}
          onChange={onChangeValueWithMaxLength}
          type='text'
          placeholder='새 할일' />
        <AddIcon
          onClick={() => onSubmit(value)}
          fontSize='large'
          sx={{ color: '#bf94FF' }} />
      </Top>
      <Bottom>
        <span>{value.length + '/30'}</span>
      </Bottom>
    </Block>
  );
};

export default TodoInput;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  span {
    color: #fff;
  }
`;

const Input = styled.input`
  width: 250px;
  padding: 12px 15px;
  font-size: 17px;
  font-weight: 500;
  color: #dedee3;
  background-color: #242731;
  border: none;
  border-bottom: 1px solid #2f323b;
  transition: box-shadow 150ms ease-out;

  &::placeholder {
    font-weight: 600;
    transition: 0.3s;
    text-align: center;
    color: #dedee3;
  }

  &:focus {
    outline: none;
    border-bottom: none;
    box-shadow: 0 2px 0 0 #bf94FF;
  }
`;