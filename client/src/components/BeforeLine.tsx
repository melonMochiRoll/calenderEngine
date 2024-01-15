import React, { FC, ReactNode, useRef } from 'react';
import styled from '@emotion/styled';

const getRamdomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const hexArray = [
  '#EF404A', '#27AAE1',
  '#FFCC4E', '#D5E05B',
  '#F2728C', '#4EB8B9',
  '#A7A9AC', '#9E7EB9',
  '#F79552', '#F9C0C7'
];

interface BeforeLineProps {
  children: ReactNode,
};

const BeforeLine: FC<BeforeLineProps> = ({
  children,
}) => {
  const index = useRef(getRamdomInt(hexArray.length - 1));

  return (
    <Block>
      <Line hex={hexArray[index.current]}/>
      {children}
    </Block>
  );
};

export default BeforeLine;

const Block = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div<{ hex: string }>`
  width: 1px;
  padding: 4px 1px;
  background-color: ${({ hex }) => hex};
  margin-right: 4px;
`;
