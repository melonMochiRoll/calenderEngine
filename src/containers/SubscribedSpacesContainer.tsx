import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import UnlockIcon from '@mui/icons-material/LockOpen';
import HelpIcon from '@mui/icons-material/HelpRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import useTooltip from 'Hooks/useTooltip';
import { privateTooltip } from 'Lib/noticeConstants';

const tempArray = [ // TODO: 서버 데이터로 대체
  {
    private: 1,
    title: '스페이스',
    OwnerId: 1,
  },
  {
    private: 0,
    title: '테스트 스페이스',
    OwnerId: 1,
  },
  {
    private: 0,
    title: '새 스페이스',
    OwnerId: 1,
  },
];

const SubscribedSpacesContainer: FC = () => {
  const sortOptions = ['모든 스페이스', '소유한 스페이스', '소유하지 않은 스페이스'];
  const [ optionIdx, setOptionIdx ] = useState<number>(0);
  const {
    anchorEl,
    open,
    onClick,
    onClose,
  } = useTooltip();
  
  const onMenuClick = (idx: number) => {
    setOptionIdx(idx);
    onClose();
  };

  return (
    <Main>
      <Top>
        <Title>스페이스 목록</Title>
        <AddButton>
          <AddIcon fontSize='large' sx={{ color: 'var(--blue)' }}/>
          <span>새 스페이스</span>
        </AddButton>
      </Top>
      <Middle>
        <Body>
        <ItemHead>
          <Tooltip title={privateTooltip} sx={{ fontSize: '24px' }} arrow>
            <ItemPrivate>
              <span>공개 여부</span>
              <HelpIcon fontSize='small' sx={{ color: 'var(--blue)' }} />
            </ItemPrivate>
          </Tooltip>
          <ItemTitle>스페이스 이름</ItemTitle>
          <ItemOwner
            onClick={onClick}>
            {sortOptions[optionIdx]}
            <ArrowDropDownIcon fontSize='large' />
          </ItemOwner>
          <Menu
            aria-labelledby='demo-positioned-button'
            anchorEl={anchorEl}
            open={open}
            onClick={onClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{ marginTop: '10px' }}>
            {
              sortOptions.map((option: string, idx: number) => {
                return (
                  <MenuItem
                    key={option}
                    onClick={() => onMenuClick(idx)}>
                    <span>{option}</span>
                  </MenuItem>
                );
              })
            }
          </Menu>
        </ItemHead>
        {
          tempArray.map((e: typeof tempArray[0]) => {
            return (
              <Item key={e.title}>
                <ItemPrivate>{e.private ? <LockIcon /> : <UnlockIcon />}</ItemPrivate>
                <ItemTitle>{e.title}</ItemTitle>
                <ItemOwner>{e.OwnerId}</ItemOwner>
              </Item>
            );
          })
        }
        </Body>
      </Middle>
    </Main>
  );
};

export default SubscribedSpacesContainer;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 20%;
  border-bottom: 1px solid var(--light-gray);
`;

const Title = styled.h1`
  font-size: 54px;
  color: var(--white);
  margin: 0;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-left: 10px;
  padding-right: 15px;
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
  border: 1px solid var(--white);
  border-radius: 25px;
  transition: all 0.3s;
  cursor: pointer;
  gap: 5px;

  &:hover {
    border-color: var(--blue);
  }
`;

const Middle = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--light-gray);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 70vh;
  padding: 1% 20%;
`;

const ItemHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid var(--light-gray);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  color: var(--white);
  border-bottom: 1px solid var(--light-gray);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: var(--light-gray);
  }
`;

const ItemPrivate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 20px;
  text-align: center;
  cursor: help;
  gap: 5px;
`;

const ItemTitle = styled.div`
  width: 45%;
  margin: 0;
  font-size: 28px;
`;

const ItemOwner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;