import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import useDoubleClick from 'Hooks/useDoubleClick';
import useInput from 'Hooks/useInput';

type TEditableTextProps = {
  text: string,
  submitEvent: Function,
};

const EditableText: FC<TEditableTextProps> = ({
  text,
  submitEvent,
}) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ value, onChangeValue ] = useInput(text);
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
            {text}
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