import React, { FC } from 'react';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { url = '' } = useParams();
  const pageName = location.pathname.split('/')[2];
  
  return (
    <Block>
      <IconButton onClick={() => navigate(`/sharedspaces/view/${url}`)}>
        <Icon active={pageName === 'view'}>
          <HomeIcon fontSize='large' />
        </Icon>
        <span>홈</span>
      </IconButton>
      <IconButton onClick={() => navigate(`/sharedspaces/chat/${url}`)}>
        <Icon active={pageName === 'chat'}>
          <ChatIcon />
        </Icon>
        <span>채팅</span>
      </IconButton>
    </Block>
  );
};

export default Sidebar;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 30px 10px;
  background-color: var(--dark-gray);
  gap: 30px;
  z-index: 1;
`;

const IconButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white);
  cursor: pointer;

  span {
    font-size: 14px;
    padding-top: 5px;
  }
`;

const Icon = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  ${({ active }) => active ? 'background-color: rgba(255, 255, 255, 0.1);' : ''}

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;