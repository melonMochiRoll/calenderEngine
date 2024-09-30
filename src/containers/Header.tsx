import React, { FC } from 'react';
import styled from '@emotion/styled';
import RenderUserProfile from 'Components/auth/RenderUserProfile';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {
  return (
    <Block>
      <Left></Left>
      <Right>
        <RenderUserProfile />
      </Right>
    </Block>
  );
};

export default Header;

const Block = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  border-bottom: 1px solid var(--light-gray);
  background-color: var(--black);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;