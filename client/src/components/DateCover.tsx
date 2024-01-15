import React, { FC } from 'react';
import styled from '@emotion/styled';
import BeforeLine from './BeforeLine';

interface DateCoverProps {
  setTodoTime: () => void;
  partialContents: any;
  isToday: boolean;
  date: number;
};

const DateCover: FC<DateCoverProps> = ({
  setTodoTime,
  partialContents,
  isToday,
  date,
}) => {
  return (
    <Block
      isToday={isToday}
      onClick={setTodoTime}>
      <Content>
        {date}
        {partialContents ?
          partialContents.map((item: string, index: number) => 
            (
              <BeforeLine key={index}>
                {item.length > 11 ?
                  <Partial>{`${item.slice(0, 11).trim()}...`}</Partial> :
                  <Partial>{item}</Partial>
                }
              </BeforeLine>
            )
          ) : ''}
      </Content>
    </Block>
  );
};

export default DateCover;

const Block = styled.td<{ isToday: boolean }>`
  width: 120px;
  cursor: pointer;
  border: ${({isToday}) => isToday ?
    `2px solid #bf94FF` : `1px solid #2f323b`};
  box-shadow: ${({isToday}) => isToday && 'inset 0 0 7px #bf94FF'};

  &:hover {
    background-color: #2c2f38;
  }

  svg {
    color: #bf94FF;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

const Partial = styled.span`
  font-size: 13px;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
`;