import React, { FC } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import DateCover from './DateCover';
import { currentMonthTodosType } from 'Pages/MainPage';

interface CalendarCreatorProps {
  setCurrentTime: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonth: number;
  currentDate: number;
  currentMonthTodos: currentMonthTodosType;
  dates: Array<number|string>;
};

const CalendarCreator: FC<CalendarCreatorProps> = ({
  setCurrentTime,
  currentYear,
  currentMonth,
  currentDate,
  currentMonthTodos,
  dates,
}) => {
  const isNowMonth = dayjs().month() === currentMonth;
  currentDate = isNowMonth ? currentDate : -1;

  return (
    <Block>
      <WeekBlock>
        <tr>
          <td>일요일</td>
          <td>월요일</td>
          <td>화요일</td>
          <td>수요일</td>
          <td>목요일</td>
          <td>금요일</td>
          <td>토요일</td>
        </tr>
      </WeekBlock>
      <DayBlock>
        {dates.map((d: number|string, i: number) => {
          if (i % 7 === 0) {
            return (
              <tr key={i}>
                {[1, 2, 3, 4, 5, 6, 7].map(n => {
                  const date = dates[i + n];
                  const timeKey = `${currentYear}&${currentMonth + 1}&${date}`;
                  if (!date || typeof date === 'string') return <td key={i + n} />;
                  return <DateCover
                    key={i + n}
                    setCurrentTime={() => setCurrentTime(timeKey)}
                    hasTodo={currentMonthTodos?.hasOwnProperty(timeKey)}
                    isToday={date === currentDate}
                    date={date} />;
                })}
              </tr>
            )
          }
        })}
      </DayBlock>
    </Block>
  );
};

export default CalendarCreator;

const Block = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    user-select: none;
  }
`;

const WeekBlock = styled.thead`
  text-align: center;
  font-size: 16px;
  font-weight: 800;

  tr {
    border-spacing: 5px;
  }

  td {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #FFFFFF;
    padding: 5px 0;
  }
`;

const DayBlock = styled.tbody`

  td {
    font-size: 18px;
    padding: 5px;
    vertical-align: top;
    height: 100px;
    color: #434F5C;
  }

  td:first-of-type {
    color: red;
  }

  td:last-of-type {
    color: blue;
  }
`;