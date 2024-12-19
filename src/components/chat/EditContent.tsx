import React, { FC } from 'react';
import styled from '@emotion/styled';

interface EditContentProps {
  onClose: () => void,
  content: string,
  onChangeContent: (e: any) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
};

const EditContent: FC<EditContentProps> = ({
  onClose,
  content,
  onChangeContent,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <ContentInput
        type='text'
        value={content}
        onChange={onChangeContent} />
      <ButtonBox>
        <Button
          type='submit'>
            전송
        </Button>
        <Button
          type='button'
          onClick={onClose}>
          취소
        </Button>
      </ButtonBox>
    </Form>
  );
};

export default EditContent;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentInput = styled.input`
  padding: 10px;
  color: var(--white);
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  background-color: var(--gray-8);

  &:focus {
    outline: none;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  color: var(--google-blue);
  font-size: 14px;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
`;