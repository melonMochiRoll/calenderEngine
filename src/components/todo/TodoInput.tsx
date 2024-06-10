import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
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
        <Button
          onClick={() => onSubmit(value)}>
          추가
        </Button>
      </Top>
      <Bottom>
        <span>{`${value.length}/30`}</span>
      </Bottom>
    </Block>
  );
};

export default TodoInput;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border: 1px solid #2f323b;
  border-radius: 15px;
  background-color: #2f323b;

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
  width: 200px;
  padding: 12px 15px;
  font-size: 17px;
  font-weight: 500;
  color: #dedee3;
  background-color: #2f323b;
  border: none;
  border-radius: 15px;

  &::placeholder {
    font-weight: 600;
    color: #dedee3;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 75px;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #6c5dd3;
  cursor: pointer;
  border: 2px solid #6c5dd3;
  border-radius: 15px;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;