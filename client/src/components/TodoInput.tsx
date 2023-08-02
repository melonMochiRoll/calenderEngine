import React, { FC } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import useInput from 'Hooks/useInput';

interface TodoInputProps {
  addTodo: (value: string) => void;
};

const TodoInput: FC<TodoInputProps> = ({
  addTodo,
}) => {
  const [ value, onChangeValue, setValue ] = useInput('');

  const onSubmit = (value: string) => {
    addTodo(value);
    setValue('');
  };

  return (
    <Block>
      <Input
        value={value}
        onChange={onChangeValue}
        type='text'
        placeholder='새 할일' />
      <AddIcon
        onClick={() => onSubmit(value)}
        fontSize='large'
        sx={{ color: '#2fb765' }} />
    </Block>
  );
};

export default TodoInput;

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 250px;
  padding: 12px 15px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: box-shadow 150ms ease-out;

  &::placeholder {
    font-weight: 600;
    transition: 0.3s;
    text-align: center;
  }

  &:focus {
    outline: none;
    border-bottom: none;
    box-shadow: 0 2px 0 0 #2fb765;
  }
`;