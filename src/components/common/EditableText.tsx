import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import useDoubleClick from 'Hooks/useDoubleClick';
import useInput from 'Hooks/useInput';

type TEditableTextProps = {
  initValue: string,
  submitEvent: Function,
};

const EditableText: FC<TEditableTextProps> = ({
  initValue,
  submitEvent,
}) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ value, onChangeValue ] = useInput(initValue);
  const onDoubleClick = useDoubleClick(() => setEditMode(true));

  const onSubmit = (e: any) => {
    e.preventDefault();
    
    submitEvent(value);
    setEditMode(false);
  };
  
  return (
    <>
      {
        editMode ?
          <form onSubmit={onSubmit}>
            <Input
              type='text'
              value={value}
              onChange={onChangeValue} />
          </form> :
          <span
            onClick={onDoubleClick}>
            {initValue}
          </span>
      }
    </>

  );
};

export default EditableText;

const Input = styled.input`
  font-size: 20px;
  font-weight: 500;
  outline: none;
`;