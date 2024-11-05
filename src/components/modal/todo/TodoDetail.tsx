import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ClockIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import PencilIcon from '@mui/icons-material/Create';
import dayjs from 'dayjs';

const TodoDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { todo } = useAppSelector(state => state.todoDetail);
  
  return (
    <Block
      onClick={e => e.stopPropagation()}>
      <Header>
        <Left></Left>
        <Center>
          <ModalTitle>Todo</ModalTitle>
        </Center>
        <Right>
          <CloseIcon
            onClick={() => dispatch(closeModal())}
            sx={{
              color: 'var(--white)',
              fontSize: '35px',
              cursor: 'pointer',
            }} />
        </Right>
      </Header>
      <Main>
        <DetailDiv>
          <Content>
            <ClockIcon sx={{ color: 'var(--blue)' }}/>
            <ContentSpan>{`${todo?.startTime} ~ ${todo?.endTime}`}</ContentSpan>
          </Content>
          <Content>
            <DescriptionIcon />
            <ContentSpan>{todo?.description}</ContentSpan>
          </Content>
          <Content>
            <PencilIcon />
            <ContentSpan>{`${todo?.Author.email}, ${dayjs(todo?.createdAt).format('YYYY-MM-DD HH:mm')}`}</ContentSpan>
          </Content>
        </DetailDiv>
        <UpdateAtDiv>
          {todo?.Editor && <LastupdatedAt>{`Last UpdatedAt : ${todo?.Editor.email}, ${todo?.updatedAt}`}</LastupdatedAt>}
        </UpdateAtDiv>
      </Main>
    </Block>
  );
};

export default TodoDetail;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 300px;
  border-radius: 15px;
  background-color: var(--black);
  box-shadow: 1px 1px 10px 2px #000;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 20px 0;
  border-bottom: 1px solid var(--light-gray);
`;

const Left = styled.div`
  width: 15%;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

const ModalTitle = styled.h1`
  color: var(--white);
  font-size: 24px;
  font-weight 600;
  margin: 0;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  width: 15%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 80%;
  padding: 20px;
  color: var(--white);
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70%;
  gap: 10px;
`;

const UpdateAtDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 30%;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentSpan = styled.span`
  font-size: 22px;
`;

const LastupdatedAt = styled.span`
  color: #868e96;
  font-size: 16px;
`;