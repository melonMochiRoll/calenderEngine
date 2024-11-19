import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from 'Hooks/reduxHooks';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { closeModal } from 'Features/modalSlice';
import MailIcon from '@mui/icons-material/Mail';
import useJoinRequest from 'Hooks/useJoinRequest';
import { CircularProgress } from '@mui/material';
import { TJoinRequest } from 'Typings/types';
import JoinRequestItem from './JoinRequestItem';

const JoinRequestManager: FC = () => {
  const dispatch = useAppDispatch();
  const { data: joinRequestsData, isLoading } = useJoinRequest();
  
  return (
    <Block
      onClick={e => e.stopPropagation()}>
      <Header>
        <Left></Left>
        <Center>
          <MailIcon fontSize='large' />
          <ModalTitle>액세스 권한 요청 목록</ModalTitle>
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
        {isLoading ? <CircularProgress size={70} /> :
          <Ul>
            {
              joinRequestsData?.map((request: TJoinRequest) => {
                return (
                  <JoinRequestItem
                    key={request.id}
                    request={request}/>
                );
              })
            }
          </Ul>
        }
      </Main>
    </Block>
  );
};

export default JoinRequestManager;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 500px;
  border-radius: 15px;
  background-color: var(--black);
  box-shadow: 1px 1px 10px 2px #000;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  padding: 20px 0;
  border-bottom: 1px solid var(--light-gray);
`;

const Left = styled.div`
  width: 15%;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  width: 70%;
  gap: 15px;
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
  align-items: center;
  width: 100%;
  height: 85%;
  color: var(--white);
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  padding-bottom: 1%;
  margin: 0;
  overflow-y: auto;
`;