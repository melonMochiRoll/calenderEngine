import React, { FC } from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/CloseRounded';
import PeopleIcon from '@mui/icons-material/PeopleAltRounded';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import useSharedspace from 'Hooks/useSharedspace';
import MemberItem from '../sharedspaceManager/MemberItem';

const SharedspaceMemberList: FC = () => {
  const dispatch = useAppDispatch();
  const { data: spaceData } = useSharedspace();
  
  return (
    <Block
      onClick={e => e.stopPropagation()}>
      <Header>
        <Left></Left>
        <Center>
          <PeopleIcon fontSize='large' sx={{ color: 'var(--white)', marginRight: '15px' }}/>
          <ModalTitle>멤버 목록</ModalTitle>
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
        <MemberDiv>
          <MembersUl>
            {spaceData.Sharedspacemembers.map((user) => {
              return (
                <MemberItem
                  key={user.UserId}
                  SharedspaceId={spaceData.id}
                  OwnerData={spaceData.Owner}
                  SharedspaceMembersAndUser={user} />
              );
            })}
          </MembersUl>
        </MemberDiv>
      </Main>
    </Block>
  );
};

export default SharedspaceMemberList;

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
  width: 100%;
  height: 85%;
  color: var(--white);
`;

const MemberDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
`;

const MembersUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;